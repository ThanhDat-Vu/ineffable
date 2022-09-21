import { Link } from "react-router-dom";

export default function RecipeCard({ recipe, withCaption = true }) {
  return (
    <Link
      to={`drinks/${recipe.idDrink}`}
      className="block w-32 sm:w-48 h-32 sm:h-48 border sm:border-2 border-golden space-y-2 text-center"
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
