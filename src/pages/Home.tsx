import { useContext, useState } from "react";
import IngredientsList from "../components/IngredientsList";
import SearchRecipesForm from "../components/SearchRecipesForm";
import { RecipeContext } from "../contexts/RecipeContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const {
    searchValues,
    removeSearchValues,
    removeExcludeValues,
    clearSearchValues,
    updateCurrentRecipes,
  } = useContext(RecipeContext);
  const navigate = useNavigate();
  const url = import.meta.env.VITE_BACKEND_URL;

  const handleSearchRecipes = async () => {
    try {
      if (!searchValues.ingredients.length) {
        toast("Please add at least one ingredient to include");
        return;
      }
      setLoading(true)
      const recipes = await fetch(
        `${url}/api/recipes?ingredients=${searchValues.ingredients.toString()}&exclude=${searchValues.excluded.toString()}&cuisine=${
          searchValues.cuisine
        }&diet=${searchValues.diet}`
      );
      const jsonRecipes = await recipes.json();
      setLoading(false)
      updateCurrentRecipes(jsonRecipes.results);
      clearSearchValues();
      navigate("/search");
    } catch (error) {
      setLoading(false)
      console.log(error);
      toast.error("Something went wrong. Please try again");
    }
  };

  return (
    <div className="flex flex-col gap-2 p-7 max-w-lg container">
      <h1 className="text-4xl text-center mb-5">What can I cook?</h1>
      <SearchRecipesForm />
      {searchValues.ingredients.length > 0 && (
        <IngredientsList
          title="Include ingredients"
          ingredients={searchValues.ingredients}
          removeFunction={removeSearchValues}
        />
      )}
      {searchValues.excluded.length > 0 && (
        <IngredientsList
          title="Exclude ingredients"
          ingredients={searchValues.excluded}
          removeFunction={removeExcludeValues}
        />
      )}
      <button
        onClick={handleSearchRecipes}
        className="btn btn-primary btn-sm mt-10"
      >
      {loading && <span className="loading loading-spinner h-4 w-4"></span>}
      {loading? 'Searching recipes': 'Search recipes'}
      </button>
    </div>
  );
};

export default Home;
