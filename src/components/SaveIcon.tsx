import { Bookmark } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Recipe, RecipeContext } from "../contexts/RecipeContext";
import { IconProps } from "../types";

const SaveIcon = ({recipeId}: IconProps) => {
  const { loggedInUser } = useContext(AuthContext);
  const { isSaved, removeSavedRecipe, addSavedRecipe, currentRecipe } = useContext(RecipeContext);

  const handleSaveButtonClicked = () => {
    if(!loggedInUser) return
    if(isSaved(Number(recipeId))) {
      removeSavedRecipe(currentRecipe as Recipe, JSON.parse(loggedInUser as string))
    } else {
      addSavedRecipe(currentRecipe as Recipe, JSON.parse(loggedInUser as string))
    }
  }
  
  return (
    <div
      className="tooltip tooltip-info"
      data-tip={loggedInUser ? null : "Log in to save recipe"}
    >
      <Bookmark
        fill={isSaved(Number(recipeId)) && loggedInUser ? "fill-black" : "none"}
        stroke={loggedInUser ? "black" : "grey"}
        strokeWidth={2.25}
        onClick={handleSaveButtonClicked}
      />
    </div>
  );
};

export default SaveIcon;
