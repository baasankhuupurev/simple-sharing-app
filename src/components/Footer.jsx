import React from "react";
import CustomLink from "./CustomLink";

export default () => {
  return (
    <footer className="fixed bottom-0 bg-gray-800 py-4 border-t border-gray-700 w-full">
      <div className="px-4 w-full">
        <div className="flex flex-wrap  justify-between items-center">
          <p className="text-gray-300 capitalize ml-4 rounded-md">
            &copy; 2023 simple sharing flatform.
          </p>
          <ul className="list-none flex">
            <CustomLink name="Privacy Policy" />
            <CustomLink name="Terms of Use" />
            <CustomLink name="Contact Us" />
          </ul>
        </div>
      </div>
    </footer>
  );
};
