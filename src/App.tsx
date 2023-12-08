import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {


  return (
    <>
        <BrowserRouter>
        <Navbar></Navbar>
          <Routes>
            <Route path="/" Component={Home}></Route>
            <Route path="/search"></Route>
            <Route path="/:recipeId"></Route>
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
