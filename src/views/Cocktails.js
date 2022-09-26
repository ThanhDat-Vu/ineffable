import Layout from "../components/Layout";
import Breadcrumb from "../components/Breadcrumb";
import { useEffect, useMemo, useRef, useState } from "react";
import { listAllCocktails } from "../API/CocktailAPI";
import Pagination from "../components/Pagination";
import RecipeCard from "../components/RecipeCard";

export default function Cocktails() {
  const [cocktails, setCocktails] = useState([]);
  useEffect(() => {
    listAllCocktails().then((res) => setCocktails(res));
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_COUNT = 32;

  const currentPageData = useMemo(() => {
    const firstIndex = (currentPage - 1) * PAGE_COUNT;
    const lastIndex = firstIndex + PAGE_COUNT;
    return cocktails.slice(firstIndex, lastIndex);
  }, [cocktails, currentPage]);

  const cocktailsRef = useRef();

  const skeletons = [...Array(32).keys()];

  return (
    <Layout>
      <div className="w-full xl:w-max xl:mx-auto px-8 xl:px-0 my-24 lg:my-32">
        <Breadcrumb intermediate="Cocktails" current="All" />
        {currentPageData.length
          ? console.log(currentPageData)
          : console.log("hi")}

        {/* Title */}
        <div className="w-max mx-auto">
          <h2 className="text-gold text-xl lg:text-2xl font-bold mt-8 mb-4 lg:my-8">
            All Cocktail {cocktails.length > 0 && `(${cocktails.length})`}
          </h2>
        </div>

        {/* Cocktail Cards */}
        <div
          className="w-max mt-4 mb-16 grid grid-cols-2 lg:grid-cols-4 gap-x-10 sm:gap-x-16 xl:gap-x-24 gap-y-12 sm:gap-y-20 xl:gap-y-24"
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
