import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/"></Route>
            <Route path="/search"></Route>
            <Route path="/:recipeId"></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
