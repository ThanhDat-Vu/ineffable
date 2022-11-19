import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchCocktailByName } from "../API/CocktailAPI";
import CocktailList from "./CocktailList";

export default function CocktailSearch() {
  const [cocktails, setCocktails] = useState([]);
  const [isLoad, setIsLoad] = useState(true);

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  useEffect(() => {
    searchCocktailByName(keyword).then((res) => {
      setCocktails(res);
      setIsLoad(false);
    });
  }, [keyword]);

  return (
    <CocktailList
      cocktails={cocktails}
      setCocktails={setCocktails}
      isLoad={isLoad}
      pathLabel="Home / Cocktails / Search"
      title={`Cocktail search: “${keyword}”`}
      dataLoader={async () => await searchCocktailByName(keyword)}
    />
  );
}
