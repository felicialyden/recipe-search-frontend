import { useNavigate } from "react-router-dom";

type RecipePreviewProps = {
  id: number;
  title: string;
  img: string;
  usingIngredients?: number;
  missingIngredients?: number;
};

const RecipePreview = ({
  id,
  title,
  img,
  usingIngredients,
  missingIngredients,
}: RecipePreviewProps) => {
  const navigate = useNavigate();

  return (
    <>
      <li className="list-none flex mt-2" onClick={() => navigate(`/${id}`)}>
        <img className="h-24 m-2" src={img} alt={title} />
        <div className="text-sm pt-3">
          <p className="font-semibold">{title}</p>
          {usingIngredients && <p>Ingredients used: {usingIngredients}</p>}
          {missingIngredients && <p>Ingredients missing: {missingIngredients}</p>}
        </div>
      </li>
      <div className="divider divider-secondary m-0"></div>
    </>
  );
};

export default RecipePreview;
