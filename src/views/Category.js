import { useParams } from "react-router-dom";
import { listCocktailsByCategory } from "../API/CocktailAPI";
import CocktailList from "./CocktailList";

export default function Category() {
  let { category } = useParams();

  return (
    <CocktailList
      pathLabel={`Home / Category / ${category}`}
      title={`Category: ${category || "All"}`}
      dataLoader={async () => await listCocktailsByCategory(category)}
    />
  );
}
