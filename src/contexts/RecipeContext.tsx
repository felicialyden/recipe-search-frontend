import { createContext, useEffect, useState } from "react";

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
        const savedRecipes = await fetch(`http://localhost:3001/api/users/2/saved`);
        const jsonRecipes = await savedRecipes.json();
        setSavedRecipes(jsonRecipes)
    }
    getRecipe()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const addSearchValues = (value: string) => {
    setSearchValues((prev) => [...prev, value]);
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

  const updateSavedRecipes = (recipe: Recipe) => {
    const savedRecipe = savedRecipes.find((savedRecipe) => savedRecipe.id === recipe.id)
    console.log(recipe)
    if(savedRecipe) {
      const newSavedRecipes = savedRecipes.filter(
        (savedRecipe) => savedRecipe.id !== recipe.id
      );
      setSavedRecipes(newSavedRecipes);
    } else {
      const newSavedRecipe = {id: recipe.id, title: recipe.title, image: recipe.image}
      setSavedRecipes((prev) => [...prev, newSavedRecipe]);
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
