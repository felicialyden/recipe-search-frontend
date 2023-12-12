import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Ingredients from "../components/Ingredients";
import { RecipeContext } from "../contexts/RecipeContext";
import Instructions from "../components/Instructions";
import BackButton from "../components/BackButton";
import {Recipe} from "../contexts/RecipeContext"
import toast from "react-hot-toast";

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const { currentRecipe, updateCurrentRecipe, updateSavedRecipes, isFavorite } = useContext(RecipeContext);

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const recipe = await fetch(
          `https://recipe-search-app-production.up.railway.app/api/recipes/${recipeId}`
        );
        const jsonRecipe = await recipe.json();
        updateCurrentRecipe(jsonRecipe);
      } catch (error) {
        toast.error('Something went wrong. Please try again')
      }

    };
    getRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSaveButtonClicked = () => {
    updateSavedRecipes(currentRecipe as Recipe)
  }

  return (
    <>
      <BackButton />
      <img
        className="my-5"
        src={currentRecipe?.image}
        alt={currentRecipe?.title}
      />
      <div className="flex align-center place-content-between">
      <h3 className="text-xl font-bold mb-2">{currentRecipe?.title}</h3>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={isFavorite(Number(recipeId))? "fill-black": "none"}
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-6 h-6"
        onClick={handleSaveButtonClicked}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
        />
      </svg>
      </div>
      <p>Servings: {currentRecipe?.servings}</p>
      <p className="mb-7">Cooking time: {currentRecipe?.readyInMinutes} min</p>
      <h4 className="text-lg font-bold my-2">Ingredients</h4>
      {currentRecipe && (
        <Ingredients ingredients={currentRecipe?.extendedIngredients} />
      )}
      <h4 className="text-lg font-bold my-2">Instructions</h4>
      {currentRecipe && (
        <Instructions steps={currentRecipe?.analyzedInstructions[0].steps} />
      )}
    </>
  );
};

export default RecipeDetails;
