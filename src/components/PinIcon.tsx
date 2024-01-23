import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Pin } from "lucide-react";
import { RecipeContext } from "../contexts/RecipeContext";

export type IconProps = {
    recipeId: number
}

const PinIcon = ({recipeId}: IconProps) => {
    const { loggedInUser } = useContext(AuthContext);
    const { isPinned } = useContext(RecipeContext);

  return (
    <div className="tooltip tooltip-info" data-tip={loggedInUser? null : "Log in to pin recipe"}>
        <Pin 
        stroke={loggedInUser ? 'black' : 'grey'}
        fill={isPinned(recipeId) && loggedInUser? "fill-black": "none"}
        />
      </div>
  )
}

export default PinIcon