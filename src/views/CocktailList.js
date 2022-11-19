import {
  Layout,
  Breadcrumb,
  CocktailCard,
  Pagination,
  SortAndFilter,
} from "../components";
import { usePagination } from "../components/Pagination";
import cocktailFilter from "../static/cocktailFilter";

export default function CocktailList({
  cocktails,
  setCocktails,
  isLoad,
  pathLabel,
  title,
  enableFilter = true,
}) {
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
          filters={enableFilter ? cocktailFilter : null}
          firstLetterProp="strDrink"
        />

        {/* Cocktail Cards */}
        <div
          className="min-w-[19rem] sm:min-w-[28rem] lg:min-w-[66rem] mb-12 grid grid-cols-2 lg:grid-cols-4 gap-x-12 sm:gap-x-16 xl:gap-x-24 gap-y-8 sm:gap-y-12 xl:gap-y-16"
          ref={scrollToRef}
        >
          {cocktails.length ? (
            currentPageData?.map((recipe) => (
              <CocktailCard
                key={recipe.idDrink}
                recipe={recipe}
                className="w-32 sm:w-48 h-32 sm:h-48"
              />
            ))
          ) : isLoad ? (
            [...Array(32).keys()]?.map((i) => (
              <CocktailCard
                key={i}
                recipe={null}
                className="w-32 sm:w-48 h-32 sm:h-48"
              />
            ))
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
