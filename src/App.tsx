import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecipeContext } from "./contexts/RecipeContext";
import { useContext } from "react";

function App() {

  const { searchValues, updateSearchValues } = useContext(RecipeContext);
  console.log(searchValues)

  return (
    <>
        <BrowserRouter>
        <button className="btn btn-primary" onClick={() => updateSearchValues('updated')}>Click</button>
          <Routes>
            <Route path="/"></Route>
            <Route path="/search"></Route>
            <Route path="/:recipeId"></Route>
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
