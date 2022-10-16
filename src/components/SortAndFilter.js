import { useEffect, useRef, useState } from "react";
import FilterSelect from "./FilterSelect";
import {
  BsChevronDown,
  BsChevronUp,
  BsSliders,
  BsSortAlphaDown,
  BsSortAlphaDownAlt,
} from "react-icons/bs";
import { createSearchParams, useSearchParams } from "react-router-dom";

export default function SortAndFilter({
  data,
  setData,
  filters,
  firstLetterProp,
}) {
  const [ascending, setAscending] = useState(true);

  function sortData() {
    setAscending(!ascending);
    setData(data?.slice().reverse());
  }

  const firstLetters = "012345679abcdefghijklmnopqrstuvwxyz";

  const [showFilters, setShowFilters] = useState(false);
  const [showFirstLetter, setShowFirstLetter] = useState(false);

  const [firstLetter, setFirstLetter] = useState("All");

  const [isReset, setIsReset] = useState(false);

  let [searchParams, setSearchParams] = useSearchParams(); // eslint-disable-line

  // Save initial Data
  const initialData = useRef({});
  useEffect(() => {
    if (
      !initialData.current.length ||
      data.length > initialData.current.length
    ) {
      initialData.current = data;
    }
  }, [data]);

  // Apply filters
  function handleFilter(e) {
    e.preventDefault();
    const query = Object.fromEntries(new FormData(e.target));
    let newData = initialData.current;
    let params = createSearchParams(query);
    setSearchParams(params);

    // Filter by filters object
    filters?.map((f) => {
      let value = query[f.label.toLowerCase()];
      if (value != "All") {
        newData = f.applyFilter(newData, value);
      }
    });

    // Filter by first letter
    let firstLetter = e.target.firstLetter.value;
    if (firstLetter !== "All") {
      newData = newData.filter(
        (i) => i[firstLetterProp][0].toLowerCase() == firstLetter
      );
    }

    setData(newData);
  }

  return (
    <div className="mb-8 xl:mb-12">
      {/* Sort */}
      <div className="flex text-2xl">
        <button
          className={`mr-auto p-2 border border-shiny-gold hover:bg-shiny-gold hover:text-rich-black text-base ${
            showFilters && "bg-shiny-gold text-rich-black"
          }`}
          aria-label="filter"
          onClick={() => setShowFilters(!showFilters)}
        >
          <BsSliders />
        </button>

        <button
          className="p-1 border border-shiny-gold mr-2 hover:bg-shiny-gold disabled:bg-shiny-gold disabled:text-rich-black"
          aria-label="sort ascending"
          onClick={sortData}
          disabled={ascending}
        >
          <BsSortAlphaDown />
        </button>
        <button
          className="p-1 border border-shiny-gold hover:bg-shiny-gold hover:text-rich-black disabled:bg-shiny-gold disabled:text-rich-black"
          aria-label="sort descending"
          onClick={sortData}
          disabled={!ascending}
        >
          <BsSortAlphaDownAlt />
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <form onSubmit={(e) => handleFilter(e)}>
          <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 items-stretch lg:items-baseline justify-between py-4 border-y border-gray-900 my-8">
            <p className="font-bold">FILTERS</p>

            {filters?.map((filter, i) => (
              <FilterSelect
                key={i}
                label={filter.label}
                menu={filter.menu}
                styles={filter.styles}
                isReset={isReset}
              />
            ))}

            <button
              className="flex items-center"
              type="button"
              onClick={() => setShowFirstLetter(!showFirstLetter)}
            >
              First Letter:
              <input
                name="firstLetter"
                value={firstLetter}
                readOnly
                className="w-5 bg-transparent text-right outline-none ml-1 font-bold cursor-pointer"
              />
              {showFirstLetter ? (
                <BsChevronUp className="ml-2" />
              ) : (
                <BsChevronDown className="ml-2" />
              )}
            </button>

            <div className="flex">
              <button
                type="reset"
                className="grow w-24 py-2 border border-gray-900 hover:border-white mr-4 italic"
                onClick={() => {
                  setIsReset(!isReset);
                  setFirstLetter("All");
                  setData(initialData.current);
                }}
              >
                Reset
              </button>
              <button className="grow w-24 py-2 bg-shiny-gold hover:brightness-125 border border-shiny-gold text-rich-black font-bold">
                Apply
              </button>
            </div>
          </div>

          {showFirstLetter && (
            <div className="w-[19rem] sm:w-[28rem] lg:w-full border-b border-gray-900 pb-8">
              <button
                type="button"
                className="px-1 hover:text-shiny-gold"
                onClick={() => setFirstLetter("All")}
              >
                All /
              </button>
              {firstLetters.split("").map((c, i) => (
                <button
                  key={i}
                  type="button"
                  className="px-1 hover:text-shiny-gold"
                  onClick={() => setFirstLetter(c)}
                >
                  {c} /
                </button>
              ))}
            </div>
          )}
        </form>
      )}
    </div>
  );
}
