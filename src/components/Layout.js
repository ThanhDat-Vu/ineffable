// https://reactrouter.com/en/main/components/nav-link
import { Link, NavLink } from "react-router-dom";
import {
  FaFacebookF,
  FaTiktok,
  FaYoutube,
  FaInstagram,
  FaPinterestP,
} from "react-icons/fa";

export default function Layout({ children }) {
  return (
    <div>
      {/* Header */}
      <div className="px-8 py-4 flex justify-between items-center">
        <span className="w-24 logo gold-gradient text-4xl">Ineffable</span>
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
          <span className="w-24 logo gold-gradient text-4xl">Ineffable</span>
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
          <a href="">
            <FaFacebookF />
          </a>
          <a href="">
            <FaTiktok />
          </a>
          <a href="">
            <FaYoutube />
          </a>
          <a href="">
            <FaInstagram />
          </a>
          <a href="">
            <FaPinterestP />
          </a>
        </div>
      </div>
    </div>
  );
}
