import { useContext } from "react";
import BackButton from "../components/BackButton";
import RecipePreview from "../components/RecipePreview";
import { RecipeContext } from "../contexts/RecipeContext";

const SavedRecipes = () => {
  const { savedRecipes } = useContext(RecipeContext);

  return (
    <>
      <BackButton />
      <div>
        <h3 className="text-xl my-5">Saved recipes</h3>
        {savedRecipes.length === 0 ? 
      <p>No saved recipes</p> :
        savedRecipes.map((recipe) => (
          <RecipePreview
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            img={recipe.image}
          />
        ))}
      </div>
    </>
  );
};

export default SavedRecipes;
