import Layout from "../components/Layout";
import Breadcrumb from "../components/Breadcrumb";
import { useEffect, useMemo, useRef, useState } from "react";
import { listAllIngredientNames } from "../API/IngredientAPI";
import { BsSliders, BsSortAlphaDown, BsSortAlphaDownAlt } from "react-icons/bs";
import IngredientCard from "../components/IngredientCard";
import Pagination from "../components/Pagination";

export default function CocktailList() {
  const [ingredientNames, setIngredientNames] = useState([]);
  useEffect(() => {
    listAllIngredientNames().then((res) => setIngredientNames(res));
  }, []);

  // Pagination

  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_COUNT = 32;

  const currentPageData = useMemo(() => {
    const firstIndex = (currentPage - 1) * PAGE_COUNT;
    const lastIndex = firstIndex + PAGE_COUNT;
    return ingredientNames.slice(firstIndex, lastIndex);
  }, [ingredientNames, currentPage]);

  const ingredientsRef = useRef();

  const skeletons = [...Array(32).keys()];

  // Filters & Sort
  const [ascending, setAscending] = useState(true);

  function sortData() {
    setAscending(!ascending);
    setIngredientNames(ingredientNames.slice().reverse());
  }

  return (
    <Layout>
      <div className="w-full xl:w-max xl:mx-auto px-8 xl:px-0 my-24 lg:my-32">
        <Breadcrumb intermediate="Ingredients" current="All" />

        {/* Title */}
        <div className="w-max mx-auto">
          <h2 className="text-gold text-xl lg:text-2xl font-bold mt-8 mb-4 lg:my-8">
            All Ingredients{" "}
            {ingredientNames.length > 0 && `(${ingredientNames.length})`}
          </h2>
        </div>

        {/* Sort & Filter */}
        <div className="flex text-2xl mb-12">
          <button className="w-max mr-auto p-2 border border-shiny-gold hover:bg-shiny-gold hover:text-rich-black text-base">
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

        {/* Ingredient Cards */}
        <div
          className="w-max mx-auto mt-4 mb-16 grid grid-cols-2 lg:grid-cols-4 gap-x-10 sm:gap-x-16 xl:gap-x-24 gap-y-12 sm:gap-y-20 xl:gap-y-24"
          ref={ingredientsRef}
        >
          {ingredientNames.length
            ? currentPageData?.map((ingredient) => (
                <IngredientCard
                  key={ingredient.strIngredient1}
                  ingredientName={ingredient.strIngredient1}
                  className="w-32 sm:w-48 h-32 sm:h-48"
                />
              ))
            : skeletons?.map((i) => (
                <IngredientCard key={i} className="w-32 sm:w-48 h-32 sm:h-48" />
              ))}
        </div>

        {/* Pagination */}
        <Pagination
          totalCount={ingredientNames.length}
          pageCount={PAGE_COUNT}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onPageChange={() =>
            window.scrollTo(0, ingredientsRef.current.offsetTop - 80)
          }
        />
      </div>
    </Layout>
  );
}
