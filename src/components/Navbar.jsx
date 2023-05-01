import React, { useContext, useEffect } from "react";
import Logo from "./Logo";
import CustomLink from "./CustomLink";
import UserContext from "../context/userContext";
import UserProfile from "./UserProfile";
import { Link } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
export default ({ children }) => {
  const state = useContext(UserContext);

  useEffect(() => {
    // console.log(state);
  }, []);
  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className=" max-w-7xl mx-auto lg:px-8">
        <div className="flex flex-column items-center justify-between h-16">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center w-1/2">
              <Logo />
              {children}
            </div>
            <ul className="ml-4 flex items-center">
              {state.isLogin ? (
                <>
                  <li>
                    <Link
                      to="/new-posts"
                      className={`
          ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white flex flex-1 items-center 
        `}
                    >
                      <div className="px-1">
                        <TbEdit className=" text-lg" />
                      </div>
                      Write
                    </Link>
                  </li>
                  <UserProfile src={state.photo && state.photo} />
                </>
              ) : (
                <>
                  <CustomLink name="Signin" uri="/sign-in" />
                  <CustomLink
                    name="Get started"
                    uri="/sign-up"
                    css="ml-4 px-3 py-2 rounded-md text-sm font-medium bg-green-700 text-white hover:bg-green-500"
                  />
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
