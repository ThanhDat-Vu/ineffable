import { useEffect, useState } from "react";

/**
 *
 * @param {string} key
 * @param {Function} loader
 * @returns {Object}
 */
export default function useSession(key, loader) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const sessionData = sessionStorage.getItem(key);
    if (sessionData) {
      setData(JSON.parse(sessionData));
    } else {
      loader().then((res) => {
        setData(res);
        sessionStorage.setItem(key, JSON.stringify(res));
      });
    }
  }, []); // eslint-disable-line

  return data;
}
