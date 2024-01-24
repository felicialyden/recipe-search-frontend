import { useNavigate } from "react-router-dom";
import RecipeInfoPopup from "./RecipeInfoPopup";
import { IngredientList } from "../types";

type RecipePreviewProps = {
  id: number;
  title: string;
  img: string;
  usedIngredientsList?: IngredientList[];
  missingIngredientsList?: IngredientList[];
};

const RecipePreview = ({
  id,
  title,
  img,
  usedIngredientsList,
  missingIngredientsList,
}: RecipePreviewProps) => {
  const navigate = useNavigate();

  return (
    <>
      <li
        className="list-none flex mt-2 cursor-pointer"
        onClick={() => navigate(`/${id}`)}
      >
        <img className="h-24 m-2" src={img} alt={title} />
        <div className="text-sm pt-3">
          <p className="font-semibold">{title}</p>
          <div className="flex gap-2 pt-2">
            {usedIngredientsList && (
              <>
                <div>
                  <p>Ingredients used: {usedIngredientsList?.length}</p>
                  <p>Ingredients missing: {missingIngredientsList?.length}</p>
                </div>
                <RecipeInfoPopup
                  usedIngredients={usedIngredientsList as IngredientList[]}
                  missingIngredients={
                    missingIngredientsList as IngredientList[]
                  }
                />
              </>
            )}
          </div>
        </div>
      </li>
      <div className="divider divider-accent m-0"></div>
    </>
  );
};

export default RecipePreview;
