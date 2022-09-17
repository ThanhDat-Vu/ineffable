import { useEffect, useRef } from "react";

function useOutsiderAlerter(ref, setFalse) {
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setFalse(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setFalse]);
}

export default function OutsiderAlerter({ children, setFalse, className }) {
  const wrapperRef = useRef(null);
  useOutsiderAlerter(wrapperRef, setFalse);

  return (
    <div ref={wrapperRef} className={className}>
      {children}
    </div>
  );
}
