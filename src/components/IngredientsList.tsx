import { useContext } from "react";
import { RecipeContext } from "../contexts/RecipeContext";

const IngredientsList = () => {
  const { searchValues, removeSearchValues } = useContext(RecipeContext);
  
  return (
    <ul>
      {searchValues.map((value) => (
        <li className="flex text-base items-center" key={value}>
          <p>{value}</p>
          <button onClick={() => removeSearchValues(value)} className="btn btn-sm btn-ghost">x</button>
        </li>
      ))}
    </ul>
  );
};

export default IngredientsList;
