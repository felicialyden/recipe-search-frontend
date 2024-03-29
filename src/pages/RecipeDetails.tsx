import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Ingredients from "../components/Ingredients";
import { RecipeContext } from "../contexts/RecipeContext";
import Instructions from "../components/Instructions";
import BackButton from "../components/BackButton";
import toast from "react-hot-toast";
import PinIcon from "../components/PinIcon";
import SaveIcon from "../components/SaveIcon";
import RecipeSkeleton from "../components/RecipeSkeleton";

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const [loading, setLoading] = useState(true);
  const { currentRecipe, updateCurrentRecipe } = useContext(RecipeContext);
  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const recipe = await fetch(`${url}/api/recipes/${recipeId}`);
        const jsonRecipe = await recipe.json();
        updateCurrentRecipe(jsonRecipe);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong. Please try again");
      } finally {
        setTimeout(() => {
        setLoading(false);
      }, 2000)
      }
    };
      getRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-2 place-items-center">
      <BackButton />
      <div className="max-w-lg container">

      {loading ? (
        <RecipeSkeleton />
      ) : (
        <>
          <img
            className="my-5"
            src={currentRecipe?.image}
            alt={currentRecipe?.title}
          />
          <div className="flex place-content-between">
            <h3 className="text-xl font-bold mb-2">{currentRecipe?.title}</h3>
            <div className="space-x-2 flex ">
              <PinIcon recipeId={Number(recipeId)} />
              <SaveIcon recipeId={Number(recipeId)} />
            </div>
          </div>
          <p>Servings: {currentRecipe?.servings}</p>
          <p className="mb-7">
            Cooking time: {currentRecipe?.readyInMinutes} min
          </p>
          <h4 className="text-lg font-bold my-2">Ingredients</h4>
          {currentRecipe && (
            <Ingredients ingredients={currentRecipe.extendedIngredients} />
          )}
          <h4 className="text-lg font-bold my-2">Instructions</h4>
          {currentRecipe?.analyzedInstructions[0] ? (
            <Instructions steps={currentRecipe.analyzedInstructions[0].steps} />
          ) : (
            <p>No instructions available</p>
          )}
</>
      )}
              </div>
    </div>
  );
};

export default RecipeDetails;
