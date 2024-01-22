import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Ingredients from "../components/Ingredients";
import { RecipeContext } from "../contexts/RecipeContext";
import Instructions from "../components/Instructions";
import BackButton from "../components/BackButton";
import {Recipe} from "../contexts/RecipeContext"
import toast from "react-hot-toast";
import { AuthContext } from "../contexts/AuthContext";

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const { currentRecipe, updateCurrentRecipe, addSavedRecipe, removeSavedRecipe, isFavorite } = useContext(RecipeContext);
  const { loggedInUser } = useContext(AuthContext);
  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const recipe = await fetch(
          `${url}/api/recipes/${recipeId}`
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
    if(!loggedInUser) return
    if(isFavorite(Number(recipeId))) {
      removeSavedRecipe(currentRecipe as Recipe, JSON.parse(loggedInUser as string))
    } else {
      addSavedRecipe(currentRecipe as Recipe, JSON.parse(loggedInUser as string))
      console.log(loggedInUser)
    }
  }

  return (
    <>
    <BackButton />
    <div className="max-w-lg container">
      
      <img
        className="my-5"
        src={currentRecipe?.image}
        alt={currentRecipe?.title}
      />
      <div className="flex align-center place-content-between">
      <h3 className="text-xl font-bold mb-2">{currentRecipe?.title}</h3>
      <div className="tooltip tooltip-info" data-tip={loggedInUser? null : "Log in to save recipe"}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={isFavorite(Number(recipeId)) && loggedInUser? "fill-black": "none"}
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke={loggedInUser ? 'black' : 'grey'}
        className="w-6 h-6 cursor-pointer"
        onClick={handleSaveButtonClicked}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
        />
      </svg>
      </div>
      </div>
      <p>Servings: {currentRecipe?.servings}</p>
      <p className="mb-7">Cooking time: {currentRecipe?.readyInMinutes} min</p>
      <h4 className="text-lg font-bold my-2">Ingredients</h4>
      {currentRecipe && (
        <Ingredients ingredients={currentRecipe?.extendedIngredients} />
      )}
      <h4 className="text-lg font-bold my-2">Instructions</h4>
      {currentRecipe?.analyzedInstructions[0]? 
        <Instructions steps={currentRecipe?.analyzedInstructions[0].steps} />
        :
        <p>No instructions available</p>
      }
    </div>
    </>
  );
};

export default RecipeDetails;
