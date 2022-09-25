import { Link } from "react-router-dom";

export default function Breadcrumb({ intermediate, current }) {
  return (
    <div className="w-max mx-auto lg:w-auto italic text-gray-400">
      <Link to="/" className="hover:text-white">
        Home
      </Link>
      /
      <Link
        to={`/cocktails/${intermediate.toLowerCase}`}
        className="hover:text-white"
      >
        {intermediate}
      </Link>
      /
      <Link to="." className="text-white">
        {current}
      </Link>
    </div>
  );
}
