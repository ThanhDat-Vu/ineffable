import { Link } from "react-router-dom";
import { getIngredientImageUrl } from "../API/IngredientAPI";

export default function IngredientCard({ ingredientName, description }) {
  return ingredientName ? (
    <Link
      to={`/ingredients/${ingredientName}`}
      className="inline-block w-32 sm:w-48 space-y-2 text-center"
    >
      <img
        src={getIngredientImageUrl(ingredientName)}
        alt={ingredientName}
        className="w-full mb-4"
      />
      <p>{description || ingredientName}</p>
    </Link>
  ) : (
    <div className="w-32 sm:w-48 h-32 sm:h-48 space-y-2 animate-pulse">
      <div className="w-full h-full mb-6 bg-gray-900" />
      <div className="w-3/4 mx-auto h-4 bg-gray-900" />
    </div>
  );
}
