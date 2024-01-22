import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IngredientList } from "../components/RecipePreview";

type RecipeContextProviderProps = {
  children: React.ReactNode;
};

export type Recipe = {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  usedIngredientCount: number;
  missedIngredientCount: number;
  usedIngredients: IngredientList[]
  missedIngredients: IngredientList[]
  extendedIngredients: { original: string }[];
  analyzedInstructions: { steps: { step: string }[] }[];
};

type SavedRecipe = {
  id: number;
  title: string;
  image: string;
};

type SearchValues = {
  ingredients: string[]
  diet?: string;
  cuisine?: string
}


type RecipeContextProps = {
  searchValues: SearchValues;
  addIngredients: (value: string) => void;
  addSearchOptions: (type: string, value: string) => void
  removeSearchValues: (value: string) => void;
  clearSearchValues: () => void;
  currentRecipes: Recipe[];
  updateCurrentRecipes: (recipes: Recipe[]) => void;
  currentRecipe: Recipe | null;
  updateCurrentRecipe: (recipe: Recipe) => void;
  savedRecipes: SavedRecipe[];
  addSavedRecipe: (recipe: Recipe, userId: string) => void;
  removeSavedRecipe: (recipe: Recipe, userId: string) => void;
  isFavorite: (recipeId: number) => true|false
};

export const RecipeContext = createContext<RecipeContextProps>({
  searchValues: {ingredients: []},
  addIngredients: () => {},
  addSearchOptions: () => {},
  removeSearchValues: () => {},
  clearSearchValues: () => {},
  currentRecipes: [],
  updateCurrentRecipes: () => {},
  currentRecipe: null,
  updateCurrentRecipe: () => {},
  savedRecipes: [],
  addSavedRecipe: () => {},
  removeSavedRecipe: () => {},
  isFavorite: () => false,
});

export const RecipeProvider = (props: RecipeContextProviderProps) => {
  const [searchValues, setSearchValues] = useState<SearchValues>({ingredients: []});
  const [currentRecipes, setCurrentRecipes] = useState<Recipe[]>([]);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);
  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const getRecipe = async () => {
      const storedUser = localStorage.getItem('loggedInUser')
      const userIdString = JSON.parse(storedUser as string)

      try {
        const savedRecipes = await fetch(`${url}/api/users/${userIdString}/saved`);
        const jsonRecipes = await savedRecipes.json();
        setSavedRecipes(jsonRecipes)
      } catch (error) {
        toast.error('Could not get saved recipes')
      }
    }
    getRecipe()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const addIngredients = (value: string) => {
    const newIngredients = [...searchValues?.ingredients as string[], value]
    setSearchValues({...searchValues, ingredients: newIngredients});
  };

  const addSearchOptions = (type: string, value: string) => {
    setSearchValues({...searchValues, [type]: value});
  }

  const clearSearchValues = () => {
    setSearchValues({ingredients: []});
  };

  const removeSearchValues = (value: string) => {
    const newIngredients = searchValues.ingredients.filter(
      (ingredient) => ingredient !== value
    );
    setSearchValues({...searchValues, ingredients: newIngredients});
  };

  const updateCurrentRecipes = (recipes: Recipe[]) => {
    setCurrentRecipes(recipes);
  };

  const updateCurrentRecipe = (recipe: Recipe) => {
    setCurrentRecipe(recipe);
  };

  const addSavedRecipe = async (recipe: Recipe, userId: string) => {
    console.log(recipe, userId)
    try {
      const newSavedRecipe = {id: recipe.id, title: recipe.title, image: recipe.image}
      const response = await fetch(`${url}/api/recipes/saved`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({...newSavedRecipe, userId})
    })
    if(!response.ok) {
      toast.error("Recipe could not be saved")
      return
    }
      setSavedRecipes((prev) => [...prev, newSavedRecipe]);
      toast.success('Added to saved recipes')
  } catch (error) {
      toast.error('Something went wrong. Please try again')
  }
  };

  const removeSavedRecipe = async (recipe: Recipe, userId: string) => {
    try {
    const savedRecipe = savedRecipes.find((savedRecipe) => savedRecipe.id === recipe.id)
    if (!savedRecipe) return
    
      const newSavedRecipes = savedRecipes.filter(
        (savedRecipe) => savedRecipe.id !== recipe.id
      );
      const response = await fetch(`${url}/api/users/${userId}/saved`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "DELETE",
      body: JSON.stringify({id: recipe.id})
    })
    if(response.status === 401) {
      toast.error("Unauthorized action")

    } else if(!response.ok) {
      toast.error("Something went wrong. Please try again")
      return
    }
      setSavedRecipes(newSavedRecipes);
      toast.success('Removed from saved recipes')
  } catch (error) {
      toast.error('Something went wrong. Please try again')
  }
  };

  const isFavorite = (recipeId: number) => {
    const savedRecipe = savedRecipes.find((savedRecipe) => savedRecipe.id === recipeId)
    if(savedRecipe) {return true}
    return false
  }


  return (
    <RecipeContext.Provider
      value={{
        searchValues,
        addIngredients,
        addSearchOptions,
        removeSearchValues,
        clearSearchValues,
        currentRecipes,
        updateCurrentRecipes,
        currentRecipe,
        updateCurrentRecipe,
        savedRecipes,
        addSavedRecipe,
        removeSavedRecipe,
        isFavorite
      }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
};
