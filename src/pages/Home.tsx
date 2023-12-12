import { useContext } from "react"
import IngredientsList from "../components/IngredientsList"
import SearchRecipesForm from "../components/SearchRecipesForm"
import { RecipeContext } from "../contexts/RecipeContext"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const Home = () => {
    const { searchValues, updateCurrentRecipes } = useContext(RecipeContext)
    const navigate = useNavigate()

    const handleSearchRecipes = async() => {
      try {
        if(!searchValues.length) {
          toast("Please add at least one ingredient")
          return
      }
      const recipes = await fetch(`https://recipe-search-app-production.up.railway.app/api/recipes?ingredients=${searchValues.toString()}`);
      const jsonRecipes = await recipes.json();
      updateCurrentRecipes(jsonRecipes)
      navigate('/search')
      } catch (error) {
        toast.error('Something went wrong. Please try again')
      }
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