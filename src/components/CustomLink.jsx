import React from "react";
import { Link } from "react-router-dom";
export default function CustomLink({
  name,
  uri = "#",
  css = {},
  onClick = () => {},
}) {
  return (
    <li>
      <Link
        to={uri}
        className={`
          ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700
          ${css}
        `}
        onClick={onClick}
      >
        {name}
      </Link>
    </li>
  );
}
