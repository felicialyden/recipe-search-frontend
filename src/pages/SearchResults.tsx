import { useContext } from "react";
import { RecipeContext } from "../contexts/RecipeContext";
import RecipePreview from "../components/RecipePreview";
import BackButton from "../components/BackButton";

const SearchResults = () => {
  const { currentRecipes } = useContext(RecipeContext);

  return (
    <div>
        <BackButton />
      <h2 className="text-3xl my-5">You can cook:</h2>
      {currentRecipes.length === 0 ? 
      <p>Could not find any matching recipes</p> :
      currentRecipes.map((recipe) => (
        <RecipePreview
          key={recipe.id}
          id={recipe.id}
          title={recipe.title}
          img={recipe.image}
          usedIngredientsCount={recipe.usedIngredientCount}
          missingIngredientsCount={recipe.missedIngredientCount}
          usedIngredientsList={recipe.usedIngredients}
          missingIngredientsList={recipe.missedIngredients}
        />
      ))}
    </div>
  );
};

export default SearchResults;