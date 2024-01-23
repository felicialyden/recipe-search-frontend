import { useContext, useState } from "react";
import { RecipeContext } from "../contexts/RecipeContext";
import { closeDropdown } from "../utils";

type DropdownProps = {
  options: string[];
  title: string;
};

const Dropdown = ({ options, title }: DropdownProps) => {
  const { addSearchOptions } = useContext(RecipeContext);
  const [selectedOption, setSelectedOption] = useState("Any");

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    addSearchOptions(title.toLowerCase(), option);
    closeDropdown()
  };

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="m-1 btn btn-secondary btn-sm">
        {`${title}: ${selectedOption}`}
      </div>
      <ul
        tabIndex={0}
        className="block shadow menu dropdown-content z-[1] bg-base-100 rounded-box max-w-52 max-h-52 overflow-y-scroll"
      >
        {options.map((option) => (
          <li
            onClick={() => handleSelect(option)}
            key={option}
            className={selectedOption === option ? "bg-gray-200 rounded-lg" : ""}
          >
            <a>{option}</a>
          </li>
        ))}
      </ul>
      </div>
  );
};

export default Dropdown;
