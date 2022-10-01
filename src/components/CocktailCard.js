import { Link } from "react-router-dom";

export default function CocktailCard({
  recipe,
  className,
  withCaption = true,
}) {
  return recipe ? (
    <Link
      to={`/cocktails/${recipe.idDrink}`}
      className={`block border sm:border-2 border-golden space-y-2 text-center ${className}`}
    >
      <img
        src={recipe.strDrinkThumb}
        alt={recipe.strDrink}
        className="relative top-1 sm:top-2 left-1 sm:left-2 w-full shadow-glass mb-4"
      />
      {withCaption && <p>{recipe.strDrink}</p>}
    </Link>
  ) : (
    <div
      className={`animate-pulse border sm:border-2 border-golden space-y-2 text-center ${className}`}
    >
      <div className="relative top-1 sm:top-2 left-1 sm:left-2 w-full h-full mb-6 bg-gray-900" />
      <div className="w-3/4 mx-auto h-4 bg-gray-900" />
    </div>
  );
}
