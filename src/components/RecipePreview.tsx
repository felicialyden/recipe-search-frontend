import { useNavigate } from "react-router-dom";

type RecipePreviewProps = {
  id: number;
  title: string;
  img: string;
  usingIngredients: number;
  missingIngredients: number;
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
    <li onClick={() => navigate(`/${id}`)}>
      <img src={img} alt={title} />
      <p>{title}</p>
      <p>Ingredients used: {usingIngredients}</p>
      <p>Ingredients missing: {missingIngredients}</p>
    </li>
  );
};

export default RecipePreview;
