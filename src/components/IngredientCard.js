import { Link } from "react-router-dom";
import { getIngredientImageUrl } from "../API/IngredientAPI";

export default function IngredientCard({ ingredient, description }) {
  return (
    <Link
      to={`ingredients/${ingredient.idIngredient}`}
      className="w-32 sm:w-48 h-32 sm:h-48 space-y-2 text-center"
    >
      <img
        src={getIngredientImageUrl(ingredient.strIngredient)}
        alt={description}
        className="w-full mb-4"
      />
      <p>{description}</p>
    </Link>
  );
}
