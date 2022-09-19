import { BsChevronDown } from "react-icons/bs";
import { useState } from "react";
import OutsiderAlerter from "./OutsiderAlerter";

export default function Dropdown({
  options,
  selectedOption,
  setSelectedOption,
  className,
  menuClassName,
  itemClassName,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelecting = (opt) => {
    setSelectedOption(opt);
    setIsOpen(false);
  };

  return (
    <OutsiderAlerter setFalse={setIsOpen} className="w-full">
      <div
        className={`w-full cursor-pointer relative ${className}`}
        role="menu"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={() => setIsOpen(false)}
      >
        {selectedOption || options[0]}
        <BsChevronDown className="absolute right-4 top-1/3" />
        {isOpen && (
          <div
            className={`w-full absolute left-0 cursor-pointer ${menuClassName}`}
          >
            {options.map((opt) => (
              <div
                key={opt}
                className={`cursor-pointer ${itemClassName}`}
                role="menuitem"
                tabIndex={0}
                onClick={() => handleSelecting(opt)}
                onKeyDown={() => setIsOpen(false)}
              >
                {opt}
              </div>
            ))}
          </div>
        )}
      </div>
    </OutsiderAlerter>
  );
}
