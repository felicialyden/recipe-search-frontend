import { SyntheticEvent, useContext } from "react";
import { RecipeContext } from "../contexts/RecipeContext";
import toast from "react-hot-toast";

const SearchRecipesForm = () => {

    const { addSearchValues } = useContext(RecipeContext)

        const handleSubmit = (e: SyntheticEvent) => {
            e.preventDefault()
            const form =  e.target as HTMLFormElement
            const searchInput = (form.elements as HTMLFormControlsCollection).namedItem('searchInput') as HTMLInputElement
            const searchValue = searchInput?.value
            if (!searchValue) {
              toast('Please add an ingredient')
              return
            }
            addSearchValues(searchValue)
            form.reset()
        }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">What do you want to cook with?</span>
        </div>
        <input
          type="text"
          name="searchInput"
          placeholder="Add ingredients one by one"
          className="input input-bordered w-full"
        />
      </label>
      <button className="btn btn-sm btn-primary mt-2 self-end">Add ingredient</button>
    </form>
  );
};

export default SearchRecipesForm;
