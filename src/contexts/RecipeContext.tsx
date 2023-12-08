import { createContext, useState } from 'react';

type RecipeContextProviderProps = {
    children: React.ReactNode;
  };

  type RecipeContextProps = {
    searchValues: string[];
    updateSearchValues: (value:string) => void
  }


  export const RecipeContext = createContext<RecipeContextProps>({
    searchValues: [],
    updateSearchValues: () => {}
  });
  
  export const RecipeProvider = (props: RecipeContextProviderProps) => {

  const [searchValues, setSearchValues] = useState<string[]>([])
  const updateSearchValues = (value:string) => {
    setSearchValues((searchValues => [...searchValues, value]) )
  }
  
    return (
      <RecipeContext.Provider
        value={{
          searchValues,
          updateSearchValues,

        }}
      >
        {props.children}
      </RecipeContext.Provider>
    );
  };