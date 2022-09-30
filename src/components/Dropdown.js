import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import OutsiderAlerter from "./OutsiderAlerter";

/**
 * @param {Object} props
 * @param {{label: string, selected: boolean}[]} props.menu
 * @param {number} props.index
 * @param {function} props.setIndex
 * @param {{ fieldStyle: string, menuStyle: string, optionStyle: string}} props.styles
 */
export default function Dropdown({ menu, index, setIndex, styles }) {
  // Behaviors
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState(menu);
  const optionsRef = useRef([]);

  useEffect(() => {
    optionsRef.current = optionsRef.current.slice(0, options.length);
  }, [options]);

  useEffect(() => {
    if (isOpen) {
      optionsRef.current[index].focus();
    } else {
      optionsRef.current[index].blur();
    }
  }, [isOpen, index]);

  function handleSelecting(newIndex) {
    options[index].selected = false;
    options[newIndex].selected = true;
    setOptions(options);
    setIndex(newIndex);
    setIsOpen(false);
  }

  function handleMenuKeyDown(e) {
    if (e.key === "Enter") {
      setIsOpen(!isOpen);
    }
    if (e.key == "Escape") {
      setIsOpen(false);
    }
  }

  function handleOptionKeyDown(e) {
    e.preventDefault();
    if (e.key == "ArrowUp" && index > 0) {
      setIndex(index - 1);
    }
    if (e.key == "ArrowDown" && index < options.length - 1) {
      setIndex(index + 1);
    }
    if (e.key == "Enter") {
      setIsOpen(false);
    }
  }

  return (
    <OutsiderAlerter setFalse={setIsOpen} className="w-full">
      {/* Field */}
      <div
        role="menu"
        tabIndex={0}
        className={`w-full flex items-center justify-between cursor-pointer box-border ${styles?.fieldStyle}`}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => handleMenuKeyDown(e)}
      >
        {options[index].label}
        {isOpen ? <BsChevronUp /> : <BsChevronDown />}
      </div>
      {/* Menu */}
      <div className="w-full relative">
        <div
          className={`absolute top-0 ${!isOpen && "hidden"} ${
            styles?.menuStyle
          }`}
        >
          {options?.map((opt, i) => (
            <div
              key={i}
              ref={(el) => (optionsRef.current[i] = el)}
              role="menuitem"
              tabIndex={0}
              className={`cursor-pointer focus:bg-white/20 ${styles?.optionStyle}`}
              onClick={() => handleSelecting(i)}
              onKeyDown={(e) => handleOptionKeyDown(e)}
            >
              {opt.label}
            </div>
          ))}
        </div>
      </div>
    </OutsiderAlerter>
  );
}
