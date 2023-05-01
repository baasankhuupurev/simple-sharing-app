import React from "react";

import { AiOutlineSearch } from "react-icons/ai";
export default ({ onChange }) => {
  return (
    <div className="mx-10 flex justify-start w-full h-10 items-center relative hidden">
      <AiOutlineSearch className="absolute text-gray-100 text-3xl font-medium left-2" />
      <input
        className="h-full pr-3  bg-gray-800 px-10 rounded-xl text-gray-300 focus:outline-none"
        type="search"
        placeholder="search ..."
        onChange={onChange}
      />
    </div>
  );
};
