import { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { listCocktailsByIngredient } from "../API/CocktailAPI";
import { getIngredientImageUrl } from "../API/IngredientAPI";
import { usePagination } from "../components/Pagination";
import { Layout, Breadcrumb, CocktailCard, Pagination } from "../components";

export default function Ingredient() {
  const ingredient = useLoaderData();

  // Drinks loader
  const [drinks, setDrinks] = useState([]);
  useEffect(() => {
    listCocktailsByIngredient(ingredient.strIngredient).then((res) =>
      setDrinks(res)
    );
  }, [ingredient]);

  // Description
  const [showLess, setShowLess] = useState(true);
  const descRef = useRef();

  // Pagination
  const PAGE_COUNT = 16;
  const { currentPage, setCurrentPage, maxPage, currentPageData, scrollToRef } =
    usePagination({
      data: drinks,
      pageCount: PAGE_COUNT,
    });

  return (
    <Layout>
      <div className="w-max mx-auto my-24 lg:my-32">
        <Breadcrumb
          pathLabel={`Home / Ingredients / ${ingredient.strIngredient}`}
        />

        {/* Title */}
        <div className="w-max mx-auto my-8 lg:ml-64">
          <h2 className="text-gold text-xl sm:text-2xl font-bold">
            {ingredient.strIngredient}
          </h2>
        </div>

        <div className="flex flex-col-reverse lg:flex-row">
          <div className="space-y-12">
            {/* Type */}
            <div className="flex flex-col lg:flex-row items-baseline">
              <h3 className="w-64 text-sm sm:text-lg font-bold mb-4 lg:mb-0">
                Type
              </h3>
              <p>{ingredient.strType}</p>
            </div>

            {/* Description */}
            <div className="flex flex-col lg:flex-row items-baseline">
              <h3 className="w-64 text-sm sm:text-lg font-bold mb-4 lg:mb-0">
                Description
              </h3>

              <div
                className="w-80 sm:w-[28rem] lg:w-96 xl:w-[32rem]"
                ref={descRef}
              >
                {ingredient.strDescription ? (
                  <>
                    <p
                      className={`${
                        showLess && "h-48"
                      } leading-8 text-clip overflow-hidden text-justify`}
                    >
                      {ingredient.strDescription}
                    </p>
                    <button
                      className="italic"
                      onClick={() => {
                        window.scrollTo(0, descRef.current.offsetTop - 80);
                        setShowLess(!showLess);
                      }}
                    >
                      {showLess ? "...Read more" : "Read less"}
                    </button>
                  </>
                ) : (
                  <p>No description</p>
                )}
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="w-56 mx-auto lg:mr-0 lg:ml-auto">
            <img
              src={getIngredientImageUrl(ingredient.strIngredient)}
              alt={ingredient.strIngredient}
              className="w-full"
            />
          </div>
        </div>

        {/* Drinks */}
        <div className="my-12" ref={scrollToRef}>
          <h3 className="w-64 text-sm sm:text-lg font-bold mb-4 lg:mb-0">
            Drinks
          </h3>
          <div className="w-max mx-auto mt-8 grid grid-cols-2 lg:grid-cols-4 gap-x-12 sm:gap-x-16 xl:gap-x-24 gap-y-8 sm:gap-y-12 xl:gap-y-16">
            {currentPageData?.map((recipe) => (
              <CocktailCard
                key={recipe.idDrink}
                recipe={recipe}
                className="w-32 sm:w-48 h-32 sm:h-48"
              />
            ))}
          </div>
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
