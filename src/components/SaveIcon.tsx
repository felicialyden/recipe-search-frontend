import { Bookmark } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Recipe, RecipeContext } from "../contexts/RecipeContext";
import { IconProps } from "../types";

const SaveIcon = ({ recipeId }: IconProps) => {
  const { loggedInUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { isSaved, removeSavedRecipe, addSavedRecipe, currentRecipe } =
    useContext(RecipeContext);

  const handleSaveButtonClicked = async () => {
    if (!loggedInUser) return;
    setLoading(true);
    if (isSaved(Number(recipeId))) {
      await removeSavedRecipe(
        currentRecipe as Recipe,
        JSON.parse(loggedInUser as string)
      );
    } else {
      await addSavedRecipe(
        currentRecipe as Recipe,
        JSON.parse(loggedInUser as string)
      );
    }
    setLoading(false);
  };

  return (
    <div
      className="tooltip tooltip-info before:w-[4rem] before:content-[attr(data-tip)]"
      data-tip={loggedInUser ? null : "Log in to save recipe"}
    >
      {loading ? (
        <div>
          <span className="loading loading-spinner h-4 w-4"></span>
        </div>
      ) : (
        <Bookmark
          fill={
            isSaved(Number(recipeId)) && loggedInUser ? "fill-black" : "none"
          }
          stroke={loggedInUser ? "black" : "grey"}
          strokeWidth={2.25}
          onClick={handleSaveButtonClicked}
        />
      )}
    </div>
  );
};

export default SaveIcon;
