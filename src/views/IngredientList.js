import { useEffect } from "react";
import { useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import {
  Layout,
  Breadcrumb,
  IngredientCard,
  Pagination,
  SortAndFilter,
} from "../components";
import { usePagination } from "../components/Pagination";

export default function IngredientList() {
  const data = useLoaderData();
  const [ingredientNames, setIngredientNames] = useState(data);

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  useEffect(() => {
    setIngredientNames((ingredientNames) =>
      ingredientNames.filter((i) =>
        i.strIngredient1.toLowerCase().includes(keyword.toLocaleLowerCase())
      )
    );
  }, [keyword]);

  const title = searchParams.has("keyword")
    ? `Ingredients search: “${keyword}”`
    : "All Ingredients";

  // Pagination
  const { currentPage, setCurrentPage, maxPage, currentPageData, scrollToRef } =
    usePagination({
      data: ingredientNames,
      pageCount: 32,
    });

  return (
    <Layout title="Ingredients" desc="Ingredient list">
      <div className="w-max mx-auto my-24 lg:my-32">
        <Breadcrumb pathLabel={`Home / Ingredients`} />

        {/* Title */}
        <div className="w-max mx-auto">
          <h2 className="text-gold text-xl sm:text-2xl font-bold my-8">
            {title}{" "}
            {ingredientNames.length > 0 && `(${ingredientNames.length})`}
          </h2>
        </div>

        {/* Sort & Filter */}
        <SortAndFilter
          data={ingredientNames}
          setData={setIngredientNames}
          firstLetterProp="strIngredient1"
        />

        {/* Ingredient Cards */}
        <div
          className="min-w-[19rem] sm:min-w-[28rem] lg:min-w-[66rem] w-max mx-auto mt-4 mb-12 grid grid-cols-2 lg:grid-cols-4 gap-x-12 sm:gap-x-16 xl:gap-x-24 gap-y-8 sm:gap-y-12 xl:gap-y-16"
          ref={scrollToRef}
        >
          {ingredientNames.length ? (
            currentPageData?.map((ingredient, i) => (
              <IngredientCard
                key={i}
                ingredientName={
                  ingredient.strIngredient || ingredient.strIngredient1
                }
                className="w-32 sm:w-48 h-32 sm:h-48"
              />
            ))
          ) : (
            <p>No ingredient found</p>
          )}
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
