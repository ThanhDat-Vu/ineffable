import { useParams } from "react-router-dom";
import { searchCocktailByName } from "../API/CocktailAPI";
import CocktailList from "./CocktailList";

export default function CocktailSearch() {
  let { keyword } = useParams();
  if (!keyword) keyword = "";
  return (
    <CocktailList
      pathLabel="Home / Cocktails / Search"
      title={`Search for “${keyword}”`}
      dataLoader={async () => await searchCocktailByName(keyword)}
    />
  );
}
