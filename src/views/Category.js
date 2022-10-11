import { useParams } from "react-router-dom";
import { listCocktailsByCategory } from "../API/CocktailAPI";
import CocktailList from "./CocktailList";

export default function Category() {
  let { category } = useParams();
  let keyword = category?.replace(" / ", "\\/");
  return (
    <CocktailList
      pathLabel={`Home / Category / ${category}`}
      title={`Category: ${category}`}
      dataLoader={async () => await listCocktailsByCategory(keyword)}
    />
  );
}
