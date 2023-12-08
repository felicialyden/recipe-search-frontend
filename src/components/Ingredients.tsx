type IngredientsProps = {
    ingredients: { original: string }[];
}

const Ingredients = ({ ingredients }: IngredientsProps) => {
  return (
    <ul className="mb-7 flex flex-col gap-2">
      {ingredients.map((ingredient, index) => (
        <li key={index}>
          <p>{ingredient.original}</p>
        </li>
      ))}
    </ul>
  );
};

export default Ingredients;
