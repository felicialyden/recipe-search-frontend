import { useContext } from "react";
import { RecipeContext } from "../contexts/RecipeContext";
import RecipePreview from "../components/RecipePreview";
import BackButton from "../components/BackButton";

const SearchResults = () => {
  const { currentRecipes } = useContext(RecipeContext);
  console.log(currentRecipes);
  return (
    <div>
        <BackButton />
      <h2 className="text-3xl my-5">You can cook:</h2>
      {currentRecipes.map((recipe) => (
        <RecipePreview
          key={recipe.id}
          id={recipe.id}
          title={recipe.title}
          img={recipe.image}
          usingIngredients={recipe.usedIngredientCount}
          missingIngredients={recipe.missedIngredientCount}
        />
      ))}
    </div>
  );
};

export default SearchResults;
