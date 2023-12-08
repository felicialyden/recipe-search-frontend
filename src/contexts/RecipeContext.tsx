import { createContext, useState } from 'react';

type RecipeContextProviderProps = {
    children: React.ReactNode;
  };

  type RecipeContextProps = {
    searchValues: string[];
    addSearchValues: (value:string) => void
    removeSearchValues: (value:string) => void
  }


  export const RecipeContext = createContext<RecipeContextProps>({
    searchValues: [],
    addSearchValues: () => {},
    removeSearchValues: () => {}
  });
  
  export const RecipeProvider = (props: RecipeContextProviderProps) => {

  const [searchValues, setSearchValues] = useState<string[]>([])
  const addSearchValues = (value: string) => {
    setSearchValues((prev => [...prev, value]) )
  }
  const removeSearchValues = (value: string) => {
    const newSearchValues = searchValues.filter((searchValue) => searchValue !== value)
    console.log(newSearchValues)
    setSearchValues((newSearchValues))
  }
  
    return (
      <RecipeContext.Provider
        value={{
          searchValues,
          addSearchValues,
          removeSearchValues
        }}
      >
        {props.children}
      </RecipeContext.Provider>
    );
  };