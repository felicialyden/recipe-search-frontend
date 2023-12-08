import IngredientsList from "../components/IngredientsList"
import SearchRecipesForm from "../components/SearchRecipesForm"

const Home = () => {
  return (
    <>
    <SearchRecipesForm></SearchRecipesForm>
    <IngredientsList></IngredientsList>
    </>
  )
}

export default Home