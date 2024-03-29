
type RecipeInfoPopupProps = {
    usedIngredients: {name: string}[]
    missingIngredients: {name: string}[]
}

const RecipeInfoPopup = ({usedIngredients, missingIngredients}: RecipeInfoPopupProps) => {

  return (
    <div onClick={(e) => e.stopPropagation()} className="dropdown dropdown-left dropdown-top dropdown-hover tablet:dropdown-top tablet:dropdown-right">
  <div tabIndex={0} role="button" className="pt-px">
    <svg tabIndex={0} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-black"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  </div>
  <div tabIndex={0} className="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-64">
    <div tabIndex={0} className="card-body">
      <h2 className="font-bold">Ingredients used:</h2>
      <ul>
        {usedIngredients.map((ingredient) => <li key={ingredient.name}>{ingredient.name.replace(ingredient.name[0], ingredient.name[0].toUpperCase())}</li>)}
      </ul>
      <h2 className="font-bold mt-2">Ingredients missing:</h2>
      <ul>
        {missingIngredients.map((ingredient) => <li key={ingredient.name}>{ingredient.name.replace(ingredient.name[0], ingredient.name[0].toUpperCase())}</li>)}
      </ul>
    </div>
  </div>
</div>
  )
}

export default RecipeInfoPopup