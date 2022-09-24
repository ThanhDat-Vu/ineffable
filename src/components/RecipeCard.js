import { Link } from "react-router-dom";

export default function RecipeCard({ recipe, className, withCaption = true }) {
  return (
    <Link
      to={`drinks/${recipe.idDrink}`}
      className={`block border sm:border-2 border-golden space-y-2 text-center ${className}`}
    >
      <img
        src={recipe.strDrinkThumb}
        alt={recipe.strDrink}
        className="relative top-1 sm:top-2 left-1 sm:left-2 w-full shadow-glass mb-4"
      />
      {withCaption ?? <p>{recipe.strDrink}</p>}
    </Link>
  );
}
