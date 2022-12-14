import { useState, useMemo, useRef } from "react";
import {
  AiOutlineVerticalRight,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineVerticalLeft,
} from "react-icons/ai";

export function usePagination({ data, pageCount }) {
  const maxPage = Math.ceil(data.length / pageCount);

  const [currentPage, setCurrentPage] = useState(1);

  const currentPageData = useMemo(() => {
    const firstIndex = (currentPage - 1) * pageCount;
    const lastIndex = firstIndex + pageCount;
    return data.slice(firstIndex, lastIndex);
  }, [data, currentPage, pageCount]);

  const scrollToRef = useRef();

  return { currentPage, setCurrentPage, maxPage, currentPageData, scrollToRef };
}

export default function Pagination({
  maxPage,
  currentPage,
  setCurrentPage,
  onPageChange,
}) {
  function changePage(index) {
    if (onPageChange) onPageChange();
    setCurrentPage(index);
    setPageInput(index);
  }

  function moveFirst() {
    if (currentPage != 1) {
      changePage(1);
    }
  }

  function movePrev() {
    if (currentPage > 1) {
      changePage(Number(currentPage) - 1);
    }
  }

  function moveNext() {
    if (currentPage < maxPage) {
      changePage(Number(currentPage) + 1);
    }
  }

  function moveLast() {
    if (currentPage != maxPage) {
      changePage(maxPage);
    }
  }

  function handlePageChange() {
    if (
      Number.isInteger(Number(pageInput)) &&
      pageInput > 0 &&
      pageInput <= maxPage
    ) {
      changePage(pageInput);
    } else {
      setPageInput(currentPage);
    }
  }

  const [pageInput, setPageInput] = useState(1);

  return (
    <div className="w-max mx-auto flex">
      <button
        className={`p-2 ${currentPage <= 1 && "text-gray-800"}`}
        onClick={moveFirst}
        aria-label="move first"
        // disabled={currentPage <= 1}
      >
        <AiOutlineVerticalRight />
      </button>
      <button
        className={`p-2 ${currentPage <= 1 && "text-gray-800"}`}
        onClick={movePrev}
        aria-label="move previous"
        // disabled={currentPage <= 1}
      >
        <AiOutlineLeft />
      </button>
      <div className="h-min w-12 bg-white text-rich-black mx-2">
        <input
          type="number"
          aria-label="page index"
          value={pageInput}
          onChange={(e) => setPageInput(e.target.value)}
          onBlur={handlePageChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.target.blur();
              handlePageChange();
            }
          }}
          className="appearance-none w-1/2 text-right py-1 bg-white outline-none"
        />
        <span className="inline-block w-1/2">/{maxPage}</span>
      </div>
      <button
        className={`p-2 ${currentPage >= maxPage && "text-gray-800"}`}
        onClick={moveNext}
        aria-label="move next"
        // disabled={currentPage >= maxPage}
      >
        <AiOutlineRight />
      </button>
      <button
        className={`p-2 ${currentPage >= maxPage && "text-gray-800"}`}
        onClick={moveLast}
        aria-label="move last"
        // disabled={currentPage >= maxPage}
      >
        <AiOutlineVerticalLeft />
      </button>
    </div>
  );
}
