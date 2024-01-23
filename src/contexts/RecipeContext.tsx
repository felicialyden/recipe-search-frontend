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
  recipeId?: number,
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
  isSaved: (recipeId: number) => true|false
  getSavedRecipes: (userId: string) => Promise<unknown>;
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
  isSaved: () => false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getSavedRecipes: () => new Promise(_resolve => ''),
});

export const RecipeProvider = (props: RecipeContextProviderProps) => {
  const [searchValues, setSearchValues] = useState<SearchValues>({ingredients: []});
  const [currentRecipes, setCurrentRecipes] = useState<Recipe[]>([]);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);
  const url = import.meta.env.VITE_BACKEND_URL;

  const getSavedRecipes = async (userId: string) => {
    try {
      const savedRecipes = await fetch(`${url}/api/users/${userId}/saved`);
      const jsonRecipes = await savedRecipes.json();
      setSavedRecipes(jsonRecipes)
    } catch (error) {
      toast.error('Could not get saved recipes')
    }
  }

  useEffect(() => {
      const storedUser = localStorage.getItem('loggedInUser')
      const userIdString = JSON.parse(storedUser as string)
      if(!storedUser) return
      getSavedRecipes(userIdString)
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
    try {
      const newSavedRecipe = {id: recipe.id, title: recipe.title, image: recipe.image}
      const response = await fetch(`${url}/api/users/${userId}/saved`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(newSavedRecipe)
    })
    const jsonResponse = await response.json()
    console.log(jsonResponse)
    if(!response.ok) {
      toast.error("Recipe could not be saved")
      return
    }
      setSavedRecipes((prev) => [...prev, jsonResponse]);
      toast.success('Added to saved recipes')
  } catch (error) {
      toast.error('Something went wrong. Please try again')
  }
  };

  const removeSavedRecipe = async (recipe: Recipe, userId: string) => {
    try {
    const savedRecipe = savedRecipes.find((savedRecipe) => savedRecipe.recipeId === recipe.id)
    console.log(savedRecipe)
    if (!savedRecipe) return

      const newSavedRecipes = savedRecipes.filter(
        (savedRecipe) => savedRecipe.recipeId !== recipe.id
      );
      const response = await fetch(`${url}/api/users/${userId}/saved`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "DELETE",
      body: JSON.stringify({id: savedRecipe.id})
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

  const isSaved = (recipeId: number) => {
    const savedRecipe = savedRecipes.find((savedRecipe) => savedRecipe.recipeId === recipeId)
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
        isSaved,
        getSavedRecipes
      }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
};
