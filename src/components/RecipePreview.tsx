import { useNavigate } from "react-router-dom";
import RecipeInfoPopup from "./RecipeInfoPopup";

type RecipePreviewProps = {
  id: number;
  title: string;
  img: string;
  usedIngredientsCount?: number;
  missingIngredientsCount?: number;
  usedIngredientsList?: IngredientList[];
  missingIngredientsList?: IngredientList[];
};

export type IngredientList = {
  name: string
}

const RecipePreview = ({
  id,
  title,
  img,
  usedIngredientsCount,
  missingIngredientsCount,
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
            <div>
              {usedIngredientsCount && (
                <p>Ingredients used: {usedIngredientsCount}</p>
              )}
              {missingIngredientsCount && (
                <p>Ingredients missing: {missingIngredientsCount}</p>
              )}
            </div>
            <RecipeInfoPopup
              usedIngredients={
                usedIngredientsList as IngredientList[]
              }
              missingIngredients={
                missingIngredientsList as IngredientList[]
              }
            />
          </div>
        </div>
      </li>
      <div className="divider divider-accent m-0"></div>
    </>
  );
};

export default RecipePreview;
