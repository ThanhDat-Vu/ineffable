import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { listCocktailsByFirstLetter } from "../API/CocktailAPI";
import {
  Layout,
  Breadcrumb,
  CocktailCard,
  Pagination,
  SortAndFilter,
} from "../components";
import { usePagination } from "../components/Pagination";
import cocktailFilter from "../static/cocktailFilter";

export default function CocktailList({ pathLabel, title, dataLoader }) {
  const [cocktails, setCocktails] = useState([]);
  const [isFound, setIsFound] = useState(true);

  const [searchParams] = useSearchParams();
  const tagName = searchParams.get("tag");

  useEffect(() => {
    if (dataLoader) {
      dataLoader().then((res) => {
        setCocktails(res);
        setIsFound(res.length > 0);
      });
    } else {
      for (let i of "12345679abcdefghijklmnopqrstvwyz") {
        listCocktailsByFirstLetter(i).then((res) => {
          if (tagName) {
            res = res.filter((i) => i.strTags && i.strTags.includes(tagName));
          }
          setCocktails((cocktails) => [...cocktails, ...res]);
          setCocktails((cocktails) =>
            cocktails.sort((a, b) =>
              a.strDrink.localeCompare(b.strDrink, "en", {
                sensitivity: "base",
              })
            )
          );
        });
      }
    }
  }, [dataLoader, tagName]);

  // Pagination
  const { currentPage, setCurrentPage, maxPage, currentPageData, scrollToRef } =
    usePagination({
      data: cocktails,
      pageCount: 32,
    });

  return (
    <Layout title={title} desc={`Cocktail List - ${title}`}>
      <div className="w-max mx-auto my-24 lg:my-32">
        <Breadcrumb pathLabel={pathLabel} />

        {/* Title */}
        <div className="w-max mx-auto">
          <h2 className="text-gold text-xl sm:text-2xl font-bold my-8">
            {title} {cocktails?.length > 0 && `(${cocktails?.length})`}
          </h2>
        </div>

        {/* Sort & Filter */}
        <SortAndFilter
          data={cocktails}
          setData={setCocktails}
          filters={cocktailFilter}
        />

        {/* Cocktail Cards */}
        <div
          className="mb-12 grid grid-cols-2 lg:grid-cols-4 gap-x-12 sm:gap-x-16 xl:gap-x-24 gap-y-8 sm:gap-y-12 xl:gap-y-16"
          ref={scrollToRef}
        >
          {isFound ? (
            cocktails.length ? (
              currentPageData?.map((recipe) => (
                <CocktailCard
                  key={recipe.idDrink}
                  recipe={recipe}
                  className="w-32 sm:w-48 h-32 sm:h-48"
                />
              ))
            ) : (
              [...Array(32).keys()]?.map((i) => (
                <CocktailCard
                  key={i}
                  recipe={null}
                  className="w-32 sm:w-48 h-32 sm:h-48"
                />
              ))
            )
          ) : (
            <p>No cocktail found!</p>
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
