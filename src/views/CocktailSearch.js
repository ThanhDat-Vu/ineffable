import { useSearchParams } from "react-router-dom";
import { searchCocktailByName } from "../API/CocktailAPI";
import CocktailList from "./CocktailList";

export default function CocktailSearch() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  return (
    <CocktailList
      pathLabel="Home / Cocktails / Search"
      title={`Search Cocktail: “${keyword}”`}
      dataLoader={async () => await searchCocktailByName(keyword)}
    />
  );
}
