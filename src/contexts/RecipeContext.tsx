import { createContext, useState } from 'react';

type RecipeContextProviderProps = {
    children: React.ReactNode;
  };

  type Recipe = {
    id: number;
    title: string;
    image: string
    usedIngredientCount: number;
    missedIngredientCount: number;
  }

  type RecipeContextProps = {
    searchValues: string[];
    addSearchValues: (value:string) => void
    removeSearchValues: (value:string) => void
    currentRecipes: Recipe[]
    updateCurrentRecipes: (recipes: Recipe[]) => void
  }


  export const RecipeContext = createContext<RecipeContextProps>({
    searchValues: [],
    addSearchValues: () => {},
    removeSearchValues: () => {},
    currentRecipes: [],
    updateCurrentRecipes: () => {}
    
  });
  
  export const RecipeProvider = (props: RecipeContextProviderProps) => {

  const [searchValues, setSearchValues] = useState<string[]>([])
  const [currentRecipes, setCurrentRecipes] = useState<Recipe[]>([])


  const addSearchValues = (value: string) => {
    setSearchValues((prev => [...prev, value]) )
  }
  const removeSearchValues = (value: string) => {
    const newSearchValues = searchValues.filter((searchValue) => searchValue !== value)
    console.log(newSearchValues)
    setSearchValues((newSearchValues))
  }

  const updateCurrentRecipes = (recipes: Recipe[]) => {
    setCurrentRecipes(recipes)
  }
  
    return (
      <RecipeContext.Provider
        value={{
          searchValues,
          addSearchValues,
          removeSearchValues,
          currentRecipes,
          updateCurrentRecipes
        }}
      >
        {props.children}
      </RecipeContext.Provider>
    );
  };