import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Layout, Breadcrumb, IngredientCard, Pagination } from "../components";
import { BsSliders, BsSortAlphaDown, BsSortAlphaDownAlt } from "react-icons/bs";
import { usePagination } from "../components/Pagination";

export default function IngredientList({ title = "All Ingredients" }) {
  const data = useLoaderData();
  const [ingredientNames, setIngredientNames] = useState(data);

  // Pagination
  const { currentPage, setCurrentPage, maxPage, currentPageData, scrollToRef } =
    usePagination({
      data: ingredientNames,
      pageCount: 32,
    });

  // Filters & Sort
  const [ascending, setAscending] = useState(true);

  function sortData() {
    setAscending(!ascending);
    setIngredientNames(ingredientNames.slice().reverse());
  }

  return (
    <Layout>
      <div className="w-max mx-auto px-8 xl:px-0 my-24 lg:my-32">
        <Breadcrumb pathLabel={`Home / Ingredients`} />

        {/* Title */}
        <div className="w-max mx-auto">
          <h2 className="text-gold text-xl lg:text-2xl font-bold my-8">
            {title}{" "}
            {ingredientNames.length > 0 && `(${ingredientNames.length})`}
          </h2>
        </div>

        {/* Sort & Filter */}
        <div className="flex text-2xl mb-8 xl:mb-12">
          <button className="w-max mr-auto p-2 border border-shiny-gold hover:bg-shiny-gold hover:text-rich-black text-base">
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

        {/* Ingredient Cards */}
        <div
          className="w-max mx-auto mt-4 mb-16 grid grid-cols-2 lg:grid-cols-4 gap-x-12 sm:gap-x-16 xl:gap-x-24 gap-y-8 sm:gap-y-12 xl:gap-y-16"
          ref={scrollToRef}
        >
          {ingredientNames.length
            ? currentPageData?.map((ingredient, i) => (
                <IngredientCard
                  key={i}
                  ingredientName={
                    ingredient.strIngredient || ingredient.strIngredient1
                  }
                  className="w-32 sm:w-48 h-32 sm:h-48"
                />
              ))
            : [...Array(32).keys()].map((i) => (
                <IngredientCard key={i} className="w-32 sm:w-48 h-32 sm:h-48" />
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
