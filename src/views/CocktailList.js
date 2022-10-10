import { useEffect, useState } from "react";
import { Layout, Breadcrumb, CocktailCard, Pagination } from "../components";
import {
  // BsChevronDown,
  BsSliders,
  BsSortAlphaDown,
  BsSortAlphaDownAlt,
} from "react-icons/bs";
import { usePagination } from "../components/Pagination";

export default function CocktailList({ pathLabel, title, dataLoader }) {
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    dataLoader().then((res) => setCocktails(res));
  }, []); // eslint-disable-line

  // Pagination
  const { currentPage, setCurrentPage, maxPage, currentPageData, scrollToRef } =
    usePagination({
      data: cocktails,
      pageCount: 32,
    });

  // Filters & Sort
  const [ascending, setAscending] = useState(true);

  function sortData() {
    setAscending(!ascending);
    setCocktails(cocktails.slice().reverse());
  }

  // const firstLetters = "12345679abcdefghijklmnopqrstvwyz";

  // const [showFilters, setShowFilters] = useState(false);

  return (
    <Layout>
      <div className="w-max mx-auto my-24 lg:my-32">
        <Breadcrumb pathLabel={pathLabel} />

        {/* Title */}
        <div className="w-max mx-auto">
          <h2 className="text-gold text-xl sm:text-2xl font-bold my-8">
            {title} {cocktails.length > 0 && `(${cocktails.length})`}
          </h2>
        </div>

        {/* Sort & Filter */}
        <div className="flex text-2xl mb-8 xl:mb-12">
          <button
            className="mr-auto p-2 border border-shiny-gold hover:bg-shiny-gold hover:text-rich-black text-base"
            // onClick={() => setShowFilters(!showFilters)}
          >
            <BsSliders />
          </button>
          <button
            className="p-1 border border-shiny-gold mr-2 hover:bg-shiny-gold disabled:bg-shiny-gold disabled:text-rich-black"
            onClick={sortData}
            disabled={ascending}
          >
            <BsSortAlphaDown />
          </button>
          <button
            className="p-1 border border-shiny-gold hover:bg-shiny-gold hover:text-rich-black disabled:bg-shiny-gold disabled:text-rich-black"
            onClick={sortData}
            disabled={!ascending}
          >
            <BsSortAlphaDownAlt />
          </button>
        </div>

        {/* Filters */}
        {/* {showFilters && (
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
        )} */}

        {/* Cocktail Cards */}
        <div
          className="mb-12 grid grid-cols-2 lg:grid-cols-4 gap-x-12 sm:gap-x-16 xl:gap-x-24 gap-y-8 sm:gap-y-12 xl:gap-y-16"
          ref={scrollToRef}
        >
          {cocktails.length
            ? currentPageData?.map((recipe) => (
                <CocktailCard
                  key={recipe.idDrink}
                  recipe={recipe}
                  className="w-32 sm:w-48 h-32 sm:h-48"
                />
              ))
            : [...Array(32).keys()]?.map((i) => (
                <CocktailCard
                  key={i}
                  recipe={null}
                  className="w-32 sm:w-48 h-32 sm:h-48"
                />
              ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          maxPage={maxPage}
          onPageChange={() =>
            window.scrollTo(0, scrollToRef.current.offsetTop - 80)
          }
        />
      </div>
    </Layout>
  );
}
