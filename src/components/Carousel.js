import { useEffect, useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function Carousel({ children }) {
  const maxIndex = useRef(0);
  const [index, setIndex] = useState(0);
  const carousel = useRef(null);

  function movePrev() {
    if (index > 0) setIndex(index - 1);
  }

  function moveNext() {
    if (index < maxIndex.current) setIndex(index + 1);
  }

  useEffect(() => {
    maxIndex.current =
      carousel.current.scrollWidth / carousel.current.offsetWidth - 1;
  }, [carousel?.current?.scrollWidth]);

  useEffect(() => {
    carousel.current.scrollLeft = carousel.current.offsetWidth * index;
  }, [index]);

  return (
    <div className="flex items-stretch mt-8">
      <button
        className="hidden lg:flex text-2xl text-gray-800 hover:text-white cursor-pointer items-center disabled:invisible"
        onClick={movePrev}
        disabled={index < 1}
      >
        <AiOutlineLeft />
      </button>
      <div
        className="w-screen lg:w-[54rem] xl:w-[68rem] overflow-x-scroll lg:overflow-hidden scroll-smooth scroll-ml-0 pb-4 -ml-2 -mr-8 lg:mx-0"
        ref={carousel}
      >
        <div className="w-max space-x-4 lg:space-x-8">{children}</div>
      </div>
      <button
        className="hidden lg:flex ml-4 text-2xl text-gray-800 hover:text-white cursor-pointer items-center disabled:invisible"
        onClick={moveNext}
        disabled={index >= maxIndex.current}
      >
        <AiOutlineRight />
      </button>
    </div>
  );
}
