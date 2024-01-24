import { useContext } from "react";
import { RecipeContext } from "../contexts/RecipeContext";
import Dropdown from "./Dropdown";
import { cuisineOptions, dietOptions } from "../dropdownOptions";
import SearchFormInput from "./SearchFormInput";

const SearchRecipesForm = () => {
  const { addIngredients, excludeIngredients } = useContext(RecipeContext);

  return (
    <>
      <SearchFormInput
        label="What do you want to cook with?"
        name="includeInput"
        onSubmitFunction={addIngredients}
      />
      <SearchFormInput
        label="Do you want to exclude any ingredients?"
        name="excludeInput"
        onSubmitFunction={excludeIngredients}
      />
      <div className="flex gap-2 items-center pt-2">
        <Dropdown options={dietOptions} title="Diet"></Dropdown>
        <Dropdown options={cuisineOptions} title="Cuisine"></Dropdown>
      </div>
    </>
  );
};

export default SearchRecipesForm;
