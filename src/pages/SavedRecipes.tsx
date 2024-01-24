import { useContext } from "react";
import BackButton from "../components/BackButton";
import RecipePreview from "../components/RecipePreview";
import { RecipeContext } from "../contexts/RecipeContext";

const SavedRecipes = () => {
  const { savedRecipes, pinnedRecipes } = useContext(RecipeContext);

  return (
    <>
      <BackButton />
      {pinnedRecipes.length && (
        <div>
          <h3 className="text-xl mt-8 mb-5">Pinned recipes</h3>
          {pinnedRecipes.map((recipe) => (
            <RecipePreview
              key={recipe.id}
              id={recipe.recipeId as number}
              title={recipe.title}
              img={recipe.image}
            />
          ))}
        </div>
      )}
      <div>
        <h3 className="text-xl my-5">Saved recipes</h3>
        {!savedRecipes.length ? (
          <p>No saved recipes</p>
        ) : (
          savedRecipes.map((recipe) => (
            <RecipePreview
              key={recipe.id}
              id={recipe.recipeId as number}
              title={recipe.title}
              img={recipe.image}
            />
          ))
        )}
      </div>
    </>
  );
};

export default SavedRecipes;
