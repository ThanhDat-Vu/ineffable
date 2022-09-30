import Layout from "../components/Layout";
import Breadcrumb from "../components/Breadcrumb";
import { useEffect, useMemo, useRef, useState } from "react";
import { listAllCocktails } from "../API/CocktailAPI";
import {
  BsChevronDown,
  BsSliders,
  BsSortAlphaDown,
  BsSortAlphaDownAlt,
} from "react-icons/bs";
import RecipeCard from "../components/RecipeCard";
import Pagination from "../components/Pagination";
import { useParams } from "react-router-dom";
import { searchCocktailByName } from "../API/SearchAPI";

export default function CocktailList() {
  const [cocktails, setCocktails] = useState([]);
  let { category, keyword } = useParams();
  useEffect(() => {
    if (keyword) {
      searchCocktailByName(keyword).then((res) => setCocktails(res));
    } else {
      listAllCocktails().then((res) =>
        setCocktails(
          category
            ? res.filter((cocktail) => cocktail.strCategory === category)
            : res
        )
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Pagination

  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_COUNT = 32;

  const currentPageData = useMemo(() => {
    const firstIndex = (currentPage - 1) * PAGE_COUNT;
    const lastIndex = firstIndex + PAGE_COUNT;
    return cocktails.slice(firstIndex, lastIndex);
  }, [cocktails, currentPage]);

  const cocktailsRef = useRef();

  const skeletons = [...Array(32).keys()];

  // Filters & Sort

  const [ascending, setAscending] = useState(true);

  function sortData() {
    setAscending(!ascending);
    setCocktails(cocktails.slice().reverse());
  }

  const firstLetters = "12345679abcdefghijklmnopqrstvwyz";

  const [showFilters, setShowFilters] = useState(false);

  return (
    <Layout>
      <div className="w-full xl:w-max xl:mx-auto px-8 xl:px-0 my-24 lg:my-32">
        <Breadcrumb intermediate="Cocktails" current="All" />

        {/* Title */}
        <div className="w-max mx-auto">
          <h2 className="text-gold text-xl lg:text-2xl font-bold mt-8 mb-4 lg:my-8">
            {category ? `Category: ${category} ` : "All Cocktails"}{" "}
            {cocktails.length > 0 && `(${cocktails.length})`}
          </h2>
        </div>

        {/* Sort & Filter */}
        <div className="flex text-2xl mb-12">
          <button
            className="w-max mr-auto p-2 border border-shiny-gold hover:bg-shiny-gold hover:text-rich-black text-base"
            onClick={() => setShowFilters(!showFilters)}
          >
            <BsSliders />
          </button>
          <button
            className="w-max p-1 border border-shiny-gold mr-2 hover:bg-shiny-gold disabled:bg-shiny-gold disabled:text-rich-black"
            onClick={sortData}
            disabled={ascending}
          >
            <BsSortAlphaDown />
          </button>
          <button
            className="w-max p-1 border border-shiny-gold hover:bg-shiny-gold hover:text-rich-black disabled:bg-shiny-gold disabled:text-rich-black"
            onClick={sortData}
            disabled={!ascending}
          >
            <BsSortAlphaDownAlt />
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div>
            <div className="flex items-center justify-between py-4 border-y border-gray-900 my-8">
              <p className="font-bold">FILTERS</p>
              <div className="flex items-center">
                Alcoholic: All
                <BsChevronDown className="ml-2" />
              </div>
              <div className="flex items-center">
                Glass: All
                <BsChevronDown className="ml-2" />
              </div>
              <div className="flex items-center">
                First Letter: All
                <BsChevronDown className="ml-2" />
              </div>
              <div>
                <button className="w-24 py-2 border border-gray-900 hover:border-white mr-4 italic">
                  Reset
                </button>
                <button className="w-24 py-2 bg-shiny-gold hover:brightness-125 border border-shiny-gold text-rich-black font-bold">
                  Apply
                </button>
              </div>
            </div>
            <div className="border-b border-gray-900 pb-8">
              <button className="mx-1 hover:text-shiny-gold">All /</button>
              {firstLetters.split("").map((c, i) => (
                <button key={i} className="mx-1 hover:text-shiny-gold">
                  {c.toUpperCase()} /
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Cocktail Cards */}
        <div
          className="w-max mx-auto mt-4 mb-16 grid grid-cols-2 lg:grid-cols-4 gap-x-10 sm:gap-x-16 xl:gap-x-24 gap-y-12 sm:gap-y-20 xl:gap-y-24"
          ref={cocktailsRef}
        >
          {cocktails.length
            ? currentPageData?.map((recipe) => (
                <RecipeCard
                  key={recipe.idDrink}
                  recipe={recipe}
                  className="w-32 sm:w-48 h-32 sm:h-48"
                />
              ))
            : skeletons?.map((i) => (
                <RecipeCard
                  key={i}
                  recipe={null}
                  className="w-32 sm:w-48 h-32 sm:h-48"
                />
              ))}
        </div>

        {/* Pagination */}
        <Pagination
          totalCount={cocktails.length}
          pageCount={PAGE_COUNT}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onPageChange={() =>
            window.scrollTo(0, cocktailsRef.current.offsetTop - 80)
          }
        />
      </div>
    </Layout>
  );
}
