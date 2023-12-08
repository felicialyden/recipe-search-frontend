import { useContext } from "react";
import BackButton from "../components/BackButton";
import RecipePreview from "../components/RecipePreview";
import { RecipeContext } from "../contexts/RecipeContext";

const SavedRecipes = () => {
  const { savedRecipes } = useContext(RecipeContext);

  console.log(savedRecipes)

  return (
    <div>
      <BackButton />
      <h3 className="text-xl my-5">Saved recipes</h3>
      {savedRecipes.map((recipe) => (
        <RecipePreview
          key={recipe.id}
          id={recipe.id}
          title={recipe.title}
          img={recipe.image}
        />
      ))}
    </div>
  );
};

export default SavedRecipes;
