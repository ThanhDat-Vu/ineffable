import React from "react";
import Turnstone from "turnstone";
import { allCocktailNames } from "../static/allCocktailNames";

export default function SearchBox() {
  const cocktailNameList = {
    data: allCocktailNames,
    searchType: "startsWith",
  };

  const styles = {
    input:
      "w-full shadow-glass p-3 mb-2 sm:mb-0 focus:outline-0 bg-white/10 focus:bg-white/20 font-normal",
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
    <div className='className="w-80 md:w-96 lg:w-[32rem] sm:mr-2 relative'>
      <Turnstone
        id="search"
        name="search"
        clearButton={true}
        noItemsMessage="We couldn't find any cocktail that matches your search"
        placeholder="Which drinks you would like to make?"
        listbox={cocktailNameList}
        maxItems={8}
        matchText={true}
        styles={styles}
      />
      <div className="absolute top-0 -z-10 w-full h-full backdrop-blur" />
    </div>
  );
}
