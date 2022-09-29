// https://reactrouter.com/en/main/components/nav-link
import { Link, NavLink, ScrollRestoration } from "react-router-dom";
import { AiOutlineRight, AiOutlineMenu } from "react-icons/ai";
import {
  FaFacebookF,
  FaTiktok,
  FaYoutube,
  FaInstagram,
  FaPinterestP,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { categories } from "../static/categories";

export default function Layout({ children }) {
  // Check if user scroll
  const [isScroll, setIsScroll] = useState(false);
  useEffect(() => {
    function handleScroll() {
      setIsScroll(window.pageYOffset !== 0);
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScroll]);

  return (
    <div className="text-xs sm:text-base">
      {/* Header */}
      <div className="sticky top-0 z-20">
        <div className="px-4 md:pl-8 md:pr-4 -mt-16 flex justify-between items-center">
          <Link
            to="/"
            className="w-20 md:w-24 py-3 font-logo text-gold text-3xl md:text-4xl"
          >
            Ineffable
          </Link>

          <div className="hidden md:flex">
            <NavLink to="/cocktails" className="px-4 py-5 hover:bg-white/10">
              Cocktails
            </NavLink>
            <NavLink to="/ingredients" className="px-4 py-5 hover:bg-white/10">
              Ingredients
            </NavLink>
            <div className="group">
              <button className="px-4 py-5 group-hover:bg-white/10">
                Categories
              </button>
              <div className="relative hidden group-hover:block">
                <div className="absolute top-0 right-0 w-max bg-rich-black/10 backdrop-blur shadow-glass">
                  {categories.map((category, i) => (
                    <Link
                      key={i}
                      to={`/categories/${encodeURIComponent(category)}`}
                      className="block text-right p-4 hover:bg-white/10"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="md:hidden p-1 text-2xl">
            <AiOutlineMenu />
          </div>
        </div>
        <div
          className={`absolute top-0 -z-10 w-full h-full ${
            isScroll &&
            "bg-rich-black/10 backdrop-blur shadow-glass transition-all duration-300"
          }`}
        />
      </div>
      {/* Body */}
      <div>{children}</div>
      {/* Footer */}
      <div className="space-y-12 mt-16">
        <hr className="border-t mx-32 md:mx-64 lg:mx-96" />
        <div className="text-center">
          <h3 className="font-bold mb-4">JOIN OUR EXCLUSIVE GROUP</h3>
          <p>We are cocktail lover, would you like to join us?</p>
          <form className="flex items-center text-rich-black bg-white w-80 sm:w-96 mx-auto mt-8">
            <input
              type="email"
              placeholder="Enter your email here!"
              className="grow p-3 outline-0"
            />
            <button className="p-3">
              <AiOutlineRight />
            </button>
          </form>
        </div>
        <div className="px-8 pb-16 flex justify-between items-center md:items-start flex-col md:flex-row space-y-4">
          {/* Logo */}
          <div className="w-24 md:w-36">
            <Link to="" className="w-24 font-logo text-gold text-4xl">
              Ineffable
            </Link>
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
      <ScrollRestoration />
    </div>
  );
}
