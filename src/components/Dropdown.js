import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useState } from "react";
import OutsiderAlerter from "./OutsiderAlerter";

/**
 * @param {Object} props
 * @param {string} props.placeholder
 * @param {Array} props.options
 * @param {{ fieldStyle: string, menuStyle: string, optionStyle: string}} props.styles
 * @param {function} [props.onClick]
 * @param {function} [props.onSelect]
 */
export default function Dropdown({
  placeholder,
  options,
  styles,
  onClick,
  onSelect,
}) {
  // Behaviors
  const [isOpen, setIsOpen] = useState(false);

  const handleSelecting = (opt) => {
    setIsOpen(false);
    if (onClick) onClick();
    if (onSelect) onSelect(opt);
  };

  return (
    <OutsiderAlerter setFalse={setIsOpen} className="w-full">
      {/* Field */}
      <div
        role="menu"
        tabIndex={0}
        className={`w-full flex items-center justify-between cursor-pointer box-border ${styles?.fieldStyle}`}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={() => setIsOpen(false)}
      >
        {placeholder}
        {isOpen ? <BsChevronUp /> : <BsChevronDown />}
      </div>
      {/* Menu */}
      <div className="w-full relative">
        {isOpen && (
          <div className={`absolute top-0 ${styles?.menuStyle}`}>
            {options?.map((opt, i) => (
              <div
                key={i}
                role="menuitem"
                tabIndex={0}
                className={`cursor-pointer ${styles?.optionStyle}`}
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
