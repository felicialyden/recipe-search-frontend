import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IngredientList } from "../types";

type RecipeContextProviderProps = {
  children: React.ReactNode;
};

export type Recipe = {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
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
  excluded: string[]
  diet?: string;
  cuisine?: string
}

type RecipeContextProps = {
  searchValues: SearchValues;
  addIngredients: (value: string) => void;
  excludeIngredients: (value: string) => void;
  addSearchOptions: (type: string, value: string) => void
  removeSearchValues: (value: string) => void;
  removeExcludeValues: (value: string) => void;
  clearSearchValues: () => void;
  currentRecipes: Recipe[];
  updateCurrentRecipes: (recipes: Recipe[]) => void;
  currentRecipe: Recipe | null;
  updateCurrentRecipe: (recipe: Recipe) => void;
  savedRecipes: SavedRecipe[];
  pinnedRecipes: SavedRecipe[];
  addSavedRecipe: (recipe: Recipe, userId: string) => Promise<unknown>;
  addPinnedRecipe: (recipe: Recipe, userId: string) => Promise<unknown>;
  removeSavedRecipe: (recipe: Recipe, userId: string) => Promise<unknown>;
  removePinnedRecipe: (recipe: Recipe, userId: string) => Promise<unknown>;
  isSaved: (recipeId: number) => true|false
  isPinned: (recipeId: number) => true|false
  getSavedRecipes: (userId: string) => Promise<unknown>;
};

export const RecipeContext = createContext<RecipeContextProps>({
  searchValues: {ingredients: [], excluded: []},
  addIngredients: () => {},
  excludeIngredients: () => {},
  addSearchOptions: () => {},
  removeSearchValues: () => {},
  removeExcludeValues: () => {},
  clearSearchValues: () => {},
  currentRecipes: [],
  updateCurrentRecipes: () => {},
  currentRecipe: null,
  updateCurrentRecipe: () => {},
  savedRecipes: [],
  pinnedRecipes: [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addSavedRecipe: () => new Promise(_resolve => ''),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeSavedRecipe: () => new Promise(_resolve => ''),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addPinnedRecipe: () => new Promise(_resolve => ''),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removePinnedRecipe: () => new Promise(_resolve => ''),
  isSaved: () => false,
  isPinned: () => false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getSavedRecipes: () => new Promise(_resolve => ''),
});

export const RecipeProvider = (props: RecipeContextProviderProps) => {
  const [searchValues, setSearchValues] = useState<SearchValues>({ingredients: [], excluded: []});
  const [currentRecipes, setCurrentRecipes] = useState<Recipe[]>([]);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);
  const [pinnedRecipes, setPinnedRecipes] = useState<SavedRecipe[]>([]);
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

  const getPinnedRecipes = async (userId: string) => {
    try {
      const savedRecipes = await fetch(`${url}/api/users/${userId}/pinned`);
      const jsonRecipes = await savedRecipes.json();
      setPinnedRecipes(jsonRecipes)
    } catch (error) {
      toast.error('Could not get pinned recipes')
    }
  }

  useEffect(() => {
      const storedUser = localStorage.getItem('loggedInUser')
      const userIdString = JSON.parse(storedUser as string)
      if(!storedUser) return
      getSavedRecipes(userIdString)
      getPinnedRecipes(userIdString)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  
  const addIngredients = (value: string) => {
    const newIngredients = [...searchValues?.ingredients as string[], value]
    setSearchValues({...searchValues, ingredients: newIngredients});
  };

  const excludeIngredients = (value: string) => {
    const newExcluded = [...searchValues?.excluded as string[], value]
    setSearchValues({...searchValues, excluded: newExcluded});
  };

  const addSearchOptions = (type: string, value: string) => {
    setSearchValues({...searchValues, [type]: value});
  }

  const clearSearchValues = () => {
    setSearchValues({ingredients: [], excluded: []});
  };

  const removeSearchValues = (value: string) => {
    const newIngredients = searchValues.ingredients.filter(
      (ingredient) => ingredient !== value
    );
    setSearchValues({...searchValues, ingredients: newIngredients});
  };

  const removeExcludeValues = (value: string) => {
    const newExcluded = searchValues.excluded.filter(
      (ingredient) => ingredient !== value
    );
    setSearchValues({...searchValues, excluded: newExcluded});
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
    if(!response.ok) {
      toast.error("Recipe could not be saved")
      return {success: false}
    }
      setSavedRecipes((prev) => [...prev, jsonResponse]);
      toast.success('Added to saved recipes')
      return {success: true}
  } catch (error) {
      toast.error('Something went wrong. Please try again')
      return {success: false}
  }
  };

  const removeSavedRecipe = async (recipe: Recipe, userId: string) => {
    try {
    const savedRecipe = savedRecipes.find((savedRecipe) => savedRecipe.recipeId === recipe.id)
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
      return {success: false}
    }
      setSavedRecipes(newSavedRecipes);
      toast.success('Removed from saved recipes')
      return {success: true}
  } catch (error) {
      toast.error('Something went wrong. Please try again')
      return {success: false}
  }
  };
  
  const addPinnedRecipe = async (recipe: Recipe, userId: string) => {
    console.log('add pinned')
    try {
      const newPinnedRecipe = {id: recipe.id, title: recipe.title, image: recipe.image}
      const response = await fetch(`${url}/api/users/${userId}/pinned`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(newPinnedRecipe)
    })
    const jsonResponse = await response.json()
    if(!response.ok) {
      toast.error("Recipe could not be saved")
      return {success: false}
    }
    setPinnedRecipes((prev) => [...prev, jsonResponse]);
      toast.success('Added to pinned recipes')
      return {success: true}
  } catch (error) {
      toast.error('Something went wrong. Please try again')
      return {success: false}
  }
  };

  const removePinnedRecipe = async (recipe: Recipe, userId: string) => {
    try {
    const pinnedRecipe = pinnedRecipes.find((pinnedRecipe) => pinnedRecipe.recipeId === recipe.id)
    if (!pinnedRecipe) return
      const newPinnedRecipes = pinnedRecipes.filter(
        (pinnedRecipe) => pinnedRecipe.recipeId !== recipe.id
      );
      const response = await fetch(`${url}/api/users/${userId}/pinned`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "DELETE",
      body: JSON.stringify({id: pinnedRecipe.id})
    })
    if(response.status === 401) {
      toast.error("Unauthorized action")
      return {success: false}
    } else if(!response.ok) {
      toast.error("Something went wrong. Please try again")
      return {success: false}

    }
    setPinnedRecipes(newPinnedRecipes);
      toast.success('Removed from pinned recipes')
      return {success: true}
  } catch (error) {
      toast.error('Something went wrong. Please try again')
      return {success: false}
  }
  };

  const isSaved = (recipeId: number) => {
    const savedRecipe = savedRecipes.find((savedRecipe) => savedRecipe.recipeId === recipeId)
    if(savedRecipe) {return true}
    return false
  }

  const isPinned = (recipeId: number) => {
    const pinnedRecipe = pinnedRecipes.find((pinnedRecipe) => pinnedRecipe.recipeId === recipeId)
    if(pinnedRecipe) {return true}
    return false
  }

  return (
    <RecipeContext.Provider
      value={{
        searchValues,
        addIngredients,
        excludeIngredients,
        addSearchOptions,
        removeSearchValues,
        removeExcludeValues,
        clearSearchValues,
        currentRecipes,
        updateCurrentRecipes,
        currentRecipe,
        updateCurrentRecipe,
        savedRecipes,
        addSavedRecipe,
        removeSavedRecipe,
        pinnedRecipes,
        addPinnedRecipe,
        removePinnedRecipe,
        isSaved,
        isPinned,
        getSavedRecipes
      }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
};
