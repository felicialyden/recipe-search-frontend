import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

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
  extendedIngredients: { original: string }[];
  analyzedInstructions: { steps: { step: string }[] }[];
};

type SavedRecipe = {
  id: number;
  title: string;
  image: string;
};


type RecipeContextProps = {
  searchValues: string[];
  addSearchValues: (value: string) => void;
  removeSearchValues: (value: string) => void;
  clearSearchValues: () => void;
  currentRecipes: Recipe[];
  updateCurrentRecipes: (recipes: Recipe[]) => void;
  currentRecipe: Recipe | null;
  updateCurrentRecipe: (recipe: Recipe) => void;
  savedRecipes: SavedRecipe[];
  updateSavedRecipes: (recipe: Recipe) => void;
  isFavorite: (recipeId: number) => true|false
};

export const RecipeContext = createContext<RecipeContextProps>({
  searchValues: [],
  addSearchValues: () => {},
  removeSearchValues: () => {},
  clearSearchValues: () => {},
  currentRecipes: [],
  updateCurrentRecipes: () => {},
  currentRecipe: null,
  updateCurrentRecipe: () => {},
  savedRecipes: [],
  updateSavedRecipes: () => {},
  isFavorite: () => false,
});

export const RecipeProvider = (props: RecipeContextProviderProps) => {
  const [searchValues, setSearchValues] = useState<string[]>([]);
  const [currentRecipes, setCurrentRecipes] = useState<Recipe[]>([]);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const savedRecipes = await fetch(`https://recipe-search-app-production.up.railway.app/api/users/2/saved`);
        const jsonRecipes = await savedRecipes.json();
        setSavedRecipes(jsonRecipes)
      } catch (error) {
        toast.error('Could not get saved recipes')
      }
    }
    getRecipe()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const addSearchValues = (value: string) => {
    setSearchValues((prev) => [...prev, value]);
  };

  const clearSearchValues = () => {
    setSearchValues([]);
  };

  const removeSearchValues = (value: string) => {
    const newSearchValues = searchValues.filter(
      (searchValue) => searchValue !== value
    );
    setSearchValues(newSearchValues);
  };

  const updateCurrentRecipes = (recipes: Recipe[]) => {
    setCurrentRecipes(recipes);
  };

  const updateCurrentRecipe = (recipe: Recipe) => {
    setCurrentRecipe(recipe);
  };

  const updateSavedRecipes = async (recipe: Recipe) => {
    try {
    const savedRecipe = savedRecipes.find((savedRecipe) => savedRecipe.id === recipe.id)
    if(savedRecipe) {
      const newSavedRecipes = savedRecipes.filter(
        (savedRecipe) => savedRecipe.id !== recipe.id
      );
      const response = await fetch(`https://recipe-search-app-production.up.railway.app/api/users/2/saved`,{
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

    } else {
      const newSavedRecipe = {id: recipe.id, title: recipe.title, image: recipe.image}
      const response = await fetch(`https://recipe-search-app-production.up.railway.app/api/users/2/saved`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(newSavedRecipe)
    })
    if(!response.ok) {
      toast.error("Recipe could not be saved")
      return
    }
      setSavedRecipes((prev) => [...prev, newSavedRecipe]);
      toast.success('Added to saved recipes')
    }
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
        addSearchValues,
        removeSearchValues,
        clearSearchValues,
        currentRecipes,
        updateCurrentRecipes,
        currentRecipe,
        updateCurrentRecipe,
        savedRecipes,
        updateSavedRecipes,
        isFavorite
      }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
};
