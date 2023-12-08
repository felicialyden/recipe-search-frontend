import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Ingredients from "../components/Ingredients";
import { RecipeContext } from "../contexts/RecipeContext";
import Instructions from "../components/Instructions";
import BackButton from "../components/BackButton";

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const { currentRecipe, updateCurrentRecipe } = useContext(RecipeContext)

  useEffect(() => {
    const getRecipe = async () => {
        const recipe = await fetch(`http://localhost:3001/api/recipes/${recipeId}`);
        const jsonRecipe = await recipe.json();
        updateCurrentRecipe(jsonRecipe)
    }
    getRecipe()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
    <BackButton />
    <img className="my-5" src={currentRecipe?.image} alt={currentRecipe?.title} />
    <h3 className="text-xl font-bold mb-2">{currentRecipe?.title}</h3>
    <p>Servings: {currentRecipe?.servings}</p>
    <p className="mb-7">Cooking time: {currentRecipe?.readyInMinutes} min</p>
    <h4 className="text-lg font-bold my-2">Ingredients</h4>
    {currentRecipe && <Ingredients ingredients={currentRecipe?.extendedIngredients}/>}
    <h4 className="text-lg font-bold my-2">Instructions</h4>
    {currentRecipe && <Instructions steps={currentRecipe?.analyzedInstructions[0].steps}/>}
    </>
  );
};

export default RecipeDetails;
