type IngredientsProps = {
    ingredients: { original: string }[];
}

const Ingredients = ({ ingredients }: IngredientsProps) => {
  return (
    <ul className="my-7 flex flex-col gap-2">
      {ingredients.map((ingredient) => (
        <li>
          <p>{ingredient.original}</p>
        </li>
      ))}
    </ul>
  );
};

export default Ingredients;
