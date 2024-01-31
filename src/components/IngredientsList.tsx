import { X } from "lucide-react";


type IngredientListProps = {
  title: string;
  ingredients: string[];
  removeFunction: (ingredient: string) => void;
}

const IngredientsList = ({ title, ingredients, removeFunction }: IngredientListProps) => {

  return (
    <ul className="mt-5">
      <h3>{`${title}: `}</h3>
      {ingredients.map((ingredient) => (
        <li key={ingredient} className="rounded-md bg-secondary px-2 py-1 m-0.5 inline-block shadow">
          <div className="flex text-lg items-center gap-1" >
            <p className="text-base">{ingredient}</p>
            <button
              onClick={() => removeFunction(ingredient)}
              className="btn btn-square btn-ghost btn-xs"
            >
             <X size={16}/>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default IngredientsList;
