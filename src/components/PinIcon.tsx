import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Pin } from "lucide-react";
import { Recipe, RecipeContext } from "../contexts/RecipeContext";
import { IconProps } from "../types";

const PinIcon = ({ recipeId }: IconProps) => {
  const { loggedInUser } = useContext(AuthContext);
  const { isPinned, addPinnedRecipe, removePinnedRecipe, currentRecipe } =
    useContext(RecipeContext);

  const handlePinButtonClicked = () => {
    if (!loggedInUser) return;
    console.log(isPinned(recipeId))
    if (isPinned(recipeId)) {
        removePinnedRecipe(
        currentRecipe as Recipe,
        JSON.parse(loggedInUser as string)
      );
    } else {
      addPinnedRecipe(
        currentRecipe as Recipe,
        JSON.parse(loggedInUser as string)
      );
    }
  };

  return (
    <div
      className="tooltip tooltip-info"
      data-tip={loggedInUser ? null : "Log in to pin recipe"}
    >
      <Pin
        size={23}
        stroke={loggedInUser ? "black" : "grey"}
        strokeWidth={2.25}
        fill={isPinned(recipeId) && loggedInUser ? "fill-black" : "none"}
        onClick={handlePinButtonClicked}
      />
    </div>
  );
};

export default PinIcon;
