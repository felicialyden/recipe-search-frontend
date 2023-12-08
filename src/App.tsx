import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";

function App() {


  return (
    <main className="p-5">
        <BrowserRouter>
        <Navbar></Navbar>
          <Routes>
            <Route path="/" Component={Home}></Route>
            <Route path="/search" Component={SearchResults}></Route>
            <Route path="/:recipeId"></Route>
          </Routes>
        </BrowserRouter>
    </main>
  );
}

export default App;
