import { SyntheticEvent, useContext } from "react";
import { RecipeContext } from "../contexts/RecipeContext";
import toast from "react-hot-toast";
import Dropdown from "./Dropdown";
import { cuisineOptions, dietOptions } from "../dropdownOptions";

const SearchRecipesForm = () => {
  const { addIngredients } = useContext(RecipeContext);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const searchInput = (form.elements as HTMLFormControlsCollection).namedItem(
      "searchInput"
    ) as HTMLInputElement;
    const searchValue = searchInput?.value;
    if (!searchValue) {
      toast("Please add an ingredient");
      return;
    }
    addIngredients(searchValue);
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">What do you want to cook with?</span>
        </div>
        <div className="flex">
          <input
            type="text"
            name="searchInput"
            placeholder="Add ingredients one by one"
            className="input input-bordered w-full rounded-tr-none rounded-br-none"
          />
          <button className="btn btn-md btn-primary rounded-tl-none rounded-bl-none">
            Add
          </button>
        </div>
      </label>
      <div className="flex gap-2 items-center pt-2">
        <Dropdown options={dietOptions} title="Diet"></Dropdown>
        <Dropdown options={cuisineOptions} title="Cuisine"></Dropdown>
      </div>
    </form>
  );
};

export default SearchRecipesForm;
