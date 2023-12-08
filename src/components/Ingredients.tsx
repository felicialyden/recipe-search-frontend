type IngredientsProps = {
    ingredients: string[]
}

const Ingredients = ({ ingredients }: IngredientsProps) => {
  return (
    <ul>
      {ingredients.map((ingredient) => (
        <li>
          <p>{ingredient}</p>
        </li>
      ))}
    </ul>
  );
};

export default Ingredients;
