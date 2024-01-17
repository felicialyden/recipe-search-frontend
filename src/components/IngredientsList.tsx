import { useContext } from "react";
import { RecipeContext } from "../contexts/RecipeContext";

const IngredientsList = () => {
  const { searchValues, removeSearchValues } = useContext(RecipeContext);

  return (
    <ul className="mt-5">
      {searchValues.ingredients.map((ingredient) => (
        <li key={ingredient}>
          <div className="flex text-lg items-center gap-1" >
            <p>{ingredient}</p>
            <button
              onClick={() => removeSearchValues(ingredient)}
              className="btn btn-square btn-ghost btn-xs"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="divider divider-secondary m-0" key={`divider${ingredient}`}></div>
        </li>
      ))}
    </ul>
  );
};

export default IngredientsList;
