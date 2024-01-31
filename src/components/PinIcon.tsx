import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Pin } from "lucide-react";
import { Recipe, RecipeContext } from "../contexts/RecipeContext";
import { IconProps } from "../types";

const PinIcon = ({ recipeId }: IconProps) => {
  const { loggedInUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { isPinned, addPinnedRecipe, removePinnedRecipe, currentRecipe } =
    useContext(RecipeContext);

  const handlePinButtonClicked = async() => {
    if (!loggedInUser) return;
    setLoading(true);
    if (isPinned(recipeId)) {
      await removePinnedRecipe(
        currentRecipe as Recipe,
        JSON.parse(loggedInUser as string)
      );
    } else {
      await addPinnedRecipe(
        currentRecipe as Recipe,
        JSON.parse(loggedInUser as string)
      );
    }
    setLoading(false);
  };

  return (
    <div
      className="tooltip tooltip-info mt-px"
      data-tip={loggedInUser ? null : "Log in to pin recipe"}
    >
      {loading ? (
        <div>
          <span className="loading loading-spinner h-4 w-4"></span>
        </div>
      ) : (
        <Pin
          size={23}
          stroke={loggedInUser ? "black" : "grey"}
          strokeWidth={2.25}
          fill={isPinned(recipeId) && loggedInUser ? "fill-black" : "none"}
          onClick={handlePinButtonClicked}
        />
      )}
    </div>
  );
};

export default PinIcon;
