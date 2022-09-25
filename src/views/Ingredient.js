import { useEffect, useMemo, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { listCocktailsByIngredient } from "../API/CocktailAPI";
import { getIngredientImageUrl } from "../API/IngredientAPI";
import Breadcrumb from "../components/Breadcrumb";
import Layout from "../components/Layout";
import Pagination from "../components/Pagination";
import RecipeCard from "../components/RecipeCard";

export default function Ingredient() {
  const ingredient = useLoaderData();

  const [drinks, setDrinks] = useState([]);
  useEffect(() => {
    listCocktailsByIngredient(ingredient.strIngredient).then((res) =>
      setDrinks(res)
    );
  }, [ingredient]);

  const [showLess, setShowLess] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_COUNT = 16;

  const currentPageData = useMemo(() => {
    const firstIndex = (currentPage - 1) * PAGE_COUNT;
    const lastIndex = firstIndex + PAGE_COUNT;
    return drinks.slice(firstIndex, lastIndex);
  }, [drinks, currentPage]);

  const drinkSection = useRef();

  return (
    <Layout>
      <div className="w-full md:w-max md:mx-auto px-8 xl:px-0 my-24 lg:my-32">
        <Breadcrumb
          intermediate="Ingredients"
          current={ingredient.strIngredient}
        />

        {/* Title */}
        <div className="w-max lg:w-full mx-auto">
          <h2 className="text-gold text-xl lg:text-2xl font-bold mx-auto lg:ml-64 mt-8 mb-4 lg:my-8">
            {ingredient.strIngredient}
          </h2>
        </div>

        <div className="flex flex-col-reverse lg:flex-row">
          <div>
            {/* Type */}
            <div className="flex flex-col lg:flex-row">
              <h3 className="w-64 text-sm lg:text-lg font-bold mb-4">Type</h3>
              <p>{ingredient.strType}</p>
            </div>

            {/* Description */}
            <div className="flex flex-col lg:flex-row my-12">
              <h3 className="w-64 text-sm lg:text-lg font-bold mb-4">
                Description
              </h3>

              <div className="w-full md:w-[32rem]">
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
                      onClick={() => setShowLess(!showLess)}
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
        <div className="mb-16" ref={drinkSection}>
          <h3 className="w-64 text-sm lg:text-lg font-bold mb-8">Drinks</h3>
          <div className="w-max mx-auto grid grid-cols-2 lg:grid-cols-4 gap-x-10 sm:gap-x-24 gap-y-12 sm:gap-y-20">
            {currentPageData?.map((recipe) => (
              <RecipeCard
                key={recipe.idDrink}
                recipe={recipe}
                className="w-32 sm:w-48 h-32 sm:h-48"
              />
            ))}
          </div>
        </div>

        {/* Pagination */}
        <Pagination
          totalCount={drinks.length}
          pageCount={PAGE_COUNT}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onPageChange={() =>
            window.scrollTo(0, drinkSection.current.offsetTop - 80)
          }
        />
      </div>
    </Layout>
  );
}
