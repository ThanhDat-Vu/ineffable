import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listCocktailsByCategory } from "../API/CocktailAPI";
import CocktailList from "./CocktailList";

export default function Category() {
  const [cocktails, setCocktails] = useState([]);
  const [isLoad, setIsLoad] = useState(true);

  let { category } = useParams();
  let keyword = category?.replace("/", "\\/");

  useEffect(() => {
    listCocktailsByCategory(keyword).then((res) => {
      setCocktails(res);
      setIsLoad(false);
    });
  }, [keyword]);

  return (
    <CocktailList
      cocktails={cocktails}
      setCocktails={setCocktails}
      isLoad={isLoad}
      pathLabel={`Home / Category / ${category.replace("/", "-")}`}
      title={`Category: ${category}`}
      enableFilter={false}
    />
  );
}
