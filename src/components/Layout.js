import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  useNavigate,
  NavLink,
  Link,
  ScrollRestoration,
} from "react-router-dom";
import { AiOutlineRight, AiOutlineLeft, AiOutlineSearch } from "react-icons/ai";
import {
  FaFacebookF,
  FaTiktok,
  FaYoutube,
  FaInstagram,
  FaPinterestP,
} from "react-icons/fa";
import { categories } from "../static/categories";
import { BsList, BsX } from "react-icons/bs";

export default function Layout({ children, title, desc }) {
  // Check if user has scrolled
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.pageYOffset !== 0);
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  // Search
  const navigate = useNavigate();
  function handleSearch(e) {
    e.preventDefault();
    let keyword = e.target.keyword.value;
    navigate(`/cocktails/search/${keyword}`);
  }

  return (
    <div className="text-xs sm:text-base">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={desc} />
      </Helmet>
      {/* Header */}
      <div className="sticky top-0 z-20">
        <div className="px-4 md:pl-8 md:pr-4 -mt-16 flex justify-between items-center">
          <Link
            to="/"
            className="w-20 md:w-24 py-4 md:py-3 font-logo text-gold text-3xl md:text-4xl leading-8 md:leading-10 z-10"
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

          {/* Menu Icon */}
          <button
            className="md:hidden p-1 text-2xl"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Menu"
          >
            <BsList />
          </button>

          {/* Overlay Menu */}
          {isMenuOpen && (
            <div className="absolute top-0 right-0 w-screen h-max min-h-screen bg-rich-black overflow-hidden">
              <div className="flex px-4 py-4">
                <button
                  className="ml-auto p-1 text-2xl"
                  onClick={() => {
                    setIsSubMenuOpen(false);
                    setIsMenuOpen(false);
                  }}
                >
                  <BsX />
                </button>
              </div>

              <form
                className="flex items-center mx-8 my-4 text-rich-black bg-white"
                onSubmit={handleSearch}
              >
                <input
                  id="keyword"
                  type="text"
                  placeholder="Cocktail recipe lookup..."
                  className="grow p-3 outline-0"
                />
                <button className="p-3 text-lg">
                  <AiOutlineSearch />
                </button>
              </form>

              <div
                className={`w-[200vw] flex relative transition-all duration-300 ease-out ${
                  isSubMenuOpen ? "right-full" : "right-0"
                }`}
              >
                {/* Menu */}
                <div className="w-screen px-8 space-y-3">
                  <div className="space-y-3">
                    <NavLink to="/cocktails" className="block py-2">
                      Cocktails
                    </NavLink>
                    <NavLink to="/ingredients" className="block py-2">
                      Ingredients
                    </NavLink>
                    <button
                      className="w-full flex items-center justify-between py-2"
                      onClick={() => setIsSubMenuOpen(true)}
                    >
                      <span>Category</span>
                      <AiOutlineRight />
                    </button>
                  </div>

                  <hr className="border-t border-gray-800" />

                  {/* BotNav in Menu */}
                  <div className="space-y-3">
                    <Link to="" className="block py-2">
                      About
                    </Link>
                    <Link to="" className="block py-2">
                      FAQ
                    </Link>
                    <Link to="" className="block py-2">
                      Contact
                    </Link>
                  </div>

                  <hr className="border-t border-gray-800" />

                  {/* Social Icons */}
                  <div className="space-y-3">
                    <a href="https://www.facebook.com/" className="block py-2">
                      <FaFacebookF className="inline mr-4" />
                      Facebook
                    </a>
                    <a href="https://www.tiktok.com/" className="block py-2">
                      <FaTiktok className="inline mr-4" />
                      Tiktok
                    </a>
                    <a href="https://youtube.com/" className="block py-2">
                      <FaYoutube className="inline mr-4" />
                      Youtube
                    </a>
                    <a href="https://www.instagram.com/" className="block py-2">
                      <FaInstagram className="inline mr-4" />
                      Instagram
                    </a>
                    <a href="https://www.pinterest.com/" className="block py-2">
                      <FaPinterestP className="inline mr-4" />
                      Pinterest
                    </a>
                  </div>
                </div>

                {/* SubMenu */}
                <div className="w-screen px-8 space-y-3">
                  <button
                    className="w-full text-left py-2"
                    onClick={() => setIsSubMenuOpen(false)}
                  >
                    <AiOutlineLeft className="inline text-md mr-2" />
                    Back
                  </button>

                  <hr className="border-t border-gray-800" />

                  <div className="space-y-2">
                    {categories.map((category, i) => (
                      <Link
                        key={i}
                        to={`/categories/${encodeURIComponent(category)}`}
                        className="block py-2 hover:bg-white/10"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* On Scroll Background */}
        <div
          className={`absolute top-0 -z-10 w-full h-full ${
            isScrolled &&
            "bg-rich-black/10 backdrop-blur shadow-glass transition-all duration-300"
          }`}
        ></div>
      </div>

      {/* Body */}
      <div>{children}</div>

      {/* Footer */}
      <div className="space-y-16 mt-24 sm:mt-32">
        <hr className="border-t w-1/2 mx-auto" />
        <div className="text-center">
          <h3 className="font-bold mb-4">JOIN OUR EXCLUSIVE GROUP</h3>
          <p>We are cocktail lover, would you like to join us?</p>
          <form
            className="w-80 sm:w-96 flex items-center mx-auto mt-6 text-rich-black bg-white"
            action="https://formsubmit.co/62c317b2c96fa4bc52f653d1e0feb8c9"
            method="POST"
          >
            <input
              type="email"
              name="email"
              placeholder="Enter your email here!"
              className="grow p-3 outline-0"
              required
            />
            <button className="p-3" aria-label="Submit">
              <AiOutlineRight />
            </button>
          </form>
        </div>
        <div className="px-8 pb-16 flex justify-between items-center md:items-start flex-col md:flex-row space-y-4">
          {/* Logo */}
          {/* This div helps center the BotNav */}
          <div className="w-20 md:w-36">
            <Link
              to=""
              className="w-20 md:w-24 font-logo text-gold text-3xl md:text-4xl"
            >
              Ineffable
            </Link>
          </div>

          <div>
            {/* BotNav */}
            <div className="flex items-center flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
              <Link to="">About</Link>
              <Link to="">FAQ</Link>
              <Link to="">Contact</Link>
            </div>
            <div className="text-center mt-4">Copyright@2022</div>
          </div>
          {/* Social Media */}
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://www.tiktok.com/" aria-label="Tiktok">
              <FaTiktok />
            </a>
            <a href="https://youtube.com/" aria-label="Youtube">
              <FaYoutube />
            </a>
            <a href="https://www.instagram.com/" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.pinterest.com/" aria-label="Pinterest">
              <FaPinterestP />
            </a>
          </div>
        </div>
      </div>

      <ScrollRestoration />
    </div>
  );
}
