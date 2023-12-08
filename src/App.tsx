import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import RecipeDetails from "./pages/RecipeDetails";
import { Toaster } from "react-hot-toast";

function App() {


  return (
    <BrowserRouter>
    <Toaster />
      <Navbar />
      <main className="p-5 bg-neutral">
        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="/search" Component={SearchResults}></Route>
          <Route path="/:recipeId" Component={RecipeDetails}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
