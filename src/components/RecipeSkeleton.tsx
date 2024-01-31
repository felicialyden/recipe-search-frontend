const RecipeSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 max-w-lg">
      <div className="skeleton h-72 w-full my-5"></div>
      <div className="skeleton h-4 w-40"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-28 mb-4"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>
  );
};

export default RecipeSkeleton;
