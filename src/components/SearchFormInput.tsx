import { SyntheticEvent } from "react";
import toast from "react-hot-toast";

type SearchFormInputProps = {
    label: string;
    name: string;
    onSubmitFunction: (searchValue: string) => void
}


const SearchFormInput = ({ label, name, onSubmitFunction}: SearchFormInputProps) => {
    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const searchInput = (form.elements as HTMLFormControlsCollection).namedItem(
          `${name}`
        ) as HTMLInputElement;
        const searchValue = searchInput?.value;
        if (!searchValue) {
          toast("Please add an ingredient");
          return;
        }
        onSubmitFunction(searchValue);
        form.reset();
      };
  
    return (
    <form onSubmit={(e) => handleSubmit(e)}>
    <label className="form-control w-full">
    <div className="label">
      <span className="label-text">{label}</span>
    </div>
    <div className="flex">
      <input
        type="text"
        name={name}
        placeholder="Add ingredients one by one"
        className="input input-bordered w-full rounded-tr-none rounded-br-none"
      />
      <button className="btn btn-md btn-primary rounded-tl-none rounded-bl-none">
        Add
      </button>
    </div>
  </label>
  </form>
  )
}

export default SearchFormInput