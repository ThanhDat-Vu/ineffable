import Turnstone from "turnstone";
import { allCocktailNames } from "../static/allCocktailNames";
import { allIngredientNames } from "../static/allIngredientName";

export default function SearchBox({ index }) {
  const keywordList = [
    {
      data: allCocktailNames,
      searchType: "startsWith",
    },
    {
      data: allIngredientNames,
      searchType: "startsWith",
    },
  ];

  const styles = {
    input:
      "w-full shadow-glass p-3 sm:mb-0 focus:outline-0 bg-white/10 focus:bg-white/20 font-normal",
    listbox: "w-full bg-white/10 backdrop-blur",
    item: "px-4 py-2",
    highlightedItem: "px-6 py-2 bg-white/10 cursor-pointer",
    match: "text-bold",
    typeahead: "text-gray-400",
    clearButton:
      "absolute inset-y-0 right-0 w-10 text-2xl text-gray-400 hover:text-white",
    noItems: "cursor-default text-center my-16",
  };

  return (
    <div className="md:w-96 lg:w-[32rem] sm:mr-2 mb-2 sm:mb-0 relative z-10">
      <Turnstone
        id="keyword"
        name="keyword"
        clearButton={true}
        noItemsMessage="We couldn't find any cocktail that matches your search"
        placeholder={
          index === 0
            ? "Which drinks you would like to make?"
            : "Which ingredient does your drink contain?"
        }
        defaultListboxIsImmutable={false}
        listboxIsImmutable={false}
        listbox={keywordList[index]}
        maxItems={8}
        matchText={true}
        styles={styles}
      />
      <div className="absolute top-0 left-0 -z-10 w-full h-full backdrop-blur" />
    </div>
  );
}
