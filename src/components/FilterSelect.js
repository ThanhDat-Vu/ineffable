import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";

export default function FilterSelect({ label, menu, styles, isReset }) {
  const [index, setIndex] = useState(0);
  const idName = label.toLowerCase();

  useEffect(() => {
    setIndex(0);
  }, [isReset]);

  return (
    <div className="flex items-center lg:items-baseline">
      <label htmlFor={idName} className="cursor-pointer mr-2">
        {label}:
      </label>
      <Dropdown
        id={idName}
        name={idName}
        menu={menu}
        index={index}
        setIndex={setIndex}
        styles={styles}
      />
    </div>
  );
}
