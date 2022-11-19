import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { listCocktailsByFirstLetter } from "../API/CocktailAPI";
import CocktailList from "./CocktailList";

export default function Category() {
  const [cocktails, setCocktails] = useState([]);
  const [isLoad, setIsLoad] = useState(true);

  const [searchParams] = useSearchParams();
  const tagName = searchParams.get("tag");

  useEffect(() => {
    for (let i of "12345679abcdefghijklmnopqrstvwyz") {
      listCocktailsByFirstLetter(i).then((res) => {
        if (tagName) {
          res = res.filter((i) => i.strTags && i.strTags.includes(tagName));
        }
        setCocktails((cocktails) => [...cocktails, ...res]);
        setCocktails((cocktails) =>
          cocktails.sort((a, b) =>
            a.strDrink.localeCompare(b.strDrink, "en", {
              sensitivity: "base",
            })
          )
        );
        if (isLoad) setIsLoad(false);
      });
    }
  }, []); // eslint-disable-line

  return (
    <CocktailList
      cocktails={cocktails}
      setCocktails={setCocktails}
      isLoad={isLoad}
      pathLabel={`Home / All Cocktails`}
      title={tagName ? `Tag: ${tagName}` : "All Cocktails"}
      enableFilter={false}
    />
  );
}
