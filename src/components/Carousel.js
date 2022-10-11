import { useEffect, useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function Carousel({ children }) {
  const maxIndex = children.length / 5 - 1;
  const [index, setIndex] = useState(0);
  const carouselRef = useRef(null);

  function movePrev() {
    if (index > 0) setIndex(index - 1);
  }

  function moveNext() {
    if (index < maxIndex) setIndex(index + 1);
  }

  useEffect(() => {
    carouselRef.current.scrollLeft = carouselRef.current.offsetWidth * index;
  }, [index]);

  return (
    <div className="w-[80vw] lg:w-max flex items-stretch mt-8">
      <button
        className="hidden lg:block pr-2 text-2xl text-gray-800 hover:text-white hover:scale-110 disabled:invisible"
        onClick={movePrev}
        disabled={index < 1}
      >
        <AiOutlineLeft />
      </button>
      <div
        className="overflow-x-scroll lg:w-[54rem] xl:w-[68rem] lg:overflow-hidden scroll-smooth -mx-[10vw] lg:mx-0 pb-4"
        ref={carouselRef}
      >
        <div className="flex items-start pl-[5vw] lg:pl-0 w-max space-x-4 lg:space-x-8">
          {children}
        </div>
      </div>
      <button
        className="hidden lg:block pl-2 ml-2 text-2xl text-gray-800 hover:text-white hover:scale-110 disabled:invisible"
        onClick={moveNext}
        disabled={index >= maxIndex}
      >
        <AiOutlineRight />
      </button>
    </div>
  );
}
