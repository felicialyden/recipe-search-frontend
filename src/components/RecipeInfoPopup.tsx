
const RecipeInfoPopup = () => {
  return (
    <div onClick={(e) => e.stopPropagation()} className="dropdown dropdown-hover">
  <div tabIndex={0} role="button" className="pt-px">
    <svg tabIndex={0} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-black"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  </div>
  <div tabIndex={0} className="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-64">
    <div tabIndex={0} className="card-body">
      <h2>Ingredients used:</h2>
      <h2>Ingredients missing:</h2>
    </div>
  </div>
</div>
  )
}

export default RecipeInfoPopup