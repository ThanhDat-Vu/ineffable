import { BsChevronDown } from "react-icons/bs";
import { useState } from "react";
import OutsiderAlerter from "./OutsiderAlerter";

export default function Dropdown({
  options,
  selectedOption,
  setSelectedOption,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelecting = (opt) => {
    setSelectedOption(opt);
    setIsOpen(false);
  };

  return (
    <OutsiderAlerter setFalse={setIsOpen} className="inline-block">
      <div
        className="inline-block w-40 p-3 bg-white/10 backdrop-blur shadow-glass relative cursor-pointer focus:bg-white/20"
        role="menu"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={() => setIsOpen(false)}
      >
        {selectedOption || options[0]}
        <BsChevronDown className="absolute right-4 top-1/3" />
        {isOpen && (
          <div className="absolute w-full left-0 top-12 bg-white/20 backdrop-blur shadow-glass cursor-pointer z-20">
            {options.map((opt) => (
              <div
                key={opt}
                className="p-3 hover:bg-white/10 cursor-pointer"
                role="menuitem"
                tabIndex={0}
                onClick={() => handleSelecting(opt)}
                onKeyDown={() => setIsOpen(0)}
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
