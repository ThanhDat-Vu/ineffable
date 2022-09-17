// https://reactrouter.com/en/main/components/nav-link
import { Link, NavLink } from "react-router-dom";
import {
  FaFacebookF,
  FaTiktok,
  FaYoutube,
  FaInstagram,
  FaPinterestP,
} from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const [isScroll, setIsScroll] = useState(false);
  useEffect(() => {
    function handleScroll() {
      setIsScroll(window.pageYOffset !== 0);
    }
    window.addEventListener("scroll", handleScroll);
    console.log(isScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScroll]);

  return (
    <div>
      {/* Header */}
      <div
        className={`sticky top-0 px-8 py-3 -mt-16 flex justify-between items-center z-10 ${
          isScroll &&
          "bg-rich-black/10 backdrop-blur shadow-glass transition-all duration-300"
        }`}
      >
        <span className="w-24 font-logo gold-gradient text-4xl">Ineffable</span>
        <div className="space-x-8">
          <NavLink to="">Cocktails</NavLink>
          <NavLink to="">Ingredients</NavLink>
          <NavLink to="">Categories</NavLink>
        </div>
      </div>
      {/* Body */}
      <div>{children}</div>
      {/* Footer */}
      <hr className="border-t mx-32 md:mx-64 lg:mx-96" />
      <div className="px-8 pt-12 pb-16 flex justify-between items-center md:items-start flex-col md:flex-row space-y-4">
        {/* Logo */}
        <div className="w-24 md:w-36">
          <span className="w-24 font-logo gold-gradient text-4xl">
            Ineffable
          </span>
        </div>
        <div className="space-y-2">
          {/* BotNav */}
          <div className="flex items-center flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
            <Link to="">About</Link>
            <Link to="">FAQ</Link>
            <Link to="">Contact</Link>
          </div>
          <div className="text-center">Copyright@2022</div>
        </div>
        {/* Social Media */}
        <div className="flex space-x-4 text">
          <a href="/">
            <FaFacebookF />
          </a>
          <a href="/">
            <FaTiktok />
          </a>
          <a href="/">
            <FaYoutube />
          </a>
          <a href="/">
            <FaInstagram />
          </a>
          <a href="/">
            <FaPinterestP />
          </a>
        </div>
      </div>
    </div>
  );
}
