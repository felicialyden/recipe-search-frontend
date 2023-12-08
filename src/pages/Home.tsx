import { useContext } from "react"
import IngredientsList from "../components/IngredientsList"
import SearchRecipesForm from "../components/SearchRecipesForm"
import { RecipeContext } from "../contexts/RecipeContext"

const Home = () => {

    const { searchValues } = useContext(RecipeContext)

    const handleSearchRecipes = async() => {
        const recipes = await fetch(`http://localhost:3001/api/recipes?ingredients=${searchValues.toString()}`);
        const jsonRecipes = await recipes.json();
        console.log("frontend response", jsonRecipes);
    }


  return (
    <div className="flex flex-col gap-2 p-7">
    <h1 className="text-4xl text-center mb-5">What can I cook?</h1>
    <SearchRecipesForm />
    <IngredientsList />
    <button onClick={handleSearchRecipes} className="btn btn-primary btn-sm mt-10">Search recipes</button>
    </div>
  )
}

export default Home