import { createContext, useState } from "react";

type RecipeContextProviderProps = {
  children: React.ReactNode;
};

type Recipe = {
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

type RecipeContextProps = {
  searchValues: string[];
  addSearchValues: (value: string) => void;
  removeSearchValues: (value: string) => void;
  currentRecipes: Recipe[];
  updateCurrentRecipes: (recipes: Recipe[]) => void;
  currentRecipe: Recipe | null;
  updateCurrentRecipe: (recipe: Recipe) => void;
};

export const RecipeContext = createContext<RecipeContextProps>({
  searchValues: [],
  addSearchValues: () => {},
  removeSearchValues: () => {},
  currentRecipes: [],
  updateCurrentRecipes: () => {},
  currentRecipe: null,
  updateCurrentRecipe: () => {},
});

export const RecipeProvider = (props: RecipeContextProviderProps) => {
  const [searchValues, setSearchValues] = useState<string[]>([]);
  const [currentRecipes, setCurrentRecipes] = useState<Recipe[]>([]);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);

  const addSearchValues = (value: string) => {
    setSearchValues((prev) => [...prev, value]);
  };
  const removeSearchValues = (value: string) => {
    const newSearchValues = searchValues.filter(
      (searchValue) => searchValue !== value
    );
    console.log(newSearchValues);
    setSearchValues(newSearchValues);
  };

  const updateCurrentRecipes = (recipes: Recipe[]) => {
    setCurrentRecipes(recipes);
  };

  const updateCurrentRecipe = (recipe: Recipe) => {
    setCurrentRecipe(recipe);
  };

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
      }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
};
