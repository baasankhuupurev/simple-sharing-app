import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";
import { CgProfile } from "react-icons/cg";
import { AiOutlineSetting } from "react-icons/ai";
import { BsPostcardHeart } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { RestApiUrl } from "../constants";
export default (props) => {
  const state = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {}, []);
  return (
    <>
      <div className="relative">
        <img
          onClick={() => setVisible(!visible)}
          className="ml-4 rounded-3xl w-10 h-10 cursor-pointer hover:border-2 hover:border-gray-500"
          src={
            props.src
              ? RestApiUrl + "/image/auth/" + props.src
              : RestApiUrl + "/image/auth/no-image.webp"
          }
          alt="Author"
        />
        {visible && (
          <div className="absolute py-1 px-1 top-12 right-0 z-20 rounded bg-gray-800 border-gray-700 border-2">
            <div
              className="flex flex-1 flex-column justify-start my-1 py-1 px-2 hover:bg-gray-600 rounded cursor-pointer"
              onClick={() => {
                navigate("/profile", { replace: true });
              }}
            >
              <CgProfile className=" text-gray-300 w-6 h-6 mr-2" />
              <div className=" text-gray-300 font-medium">Profile</div>
            </div>
            <div className="flex flex-1 flex-column justify-start my-1 py-1 px-2 hover:bg-gray-600 rounded cursor-pointer">
              <AiOutlineSetting className=" text-gray-300 w-6 h-6 mr-2" />
              <div className=" text-gray-300 font-medium">Settings</div>
            </div>
            <div className="flex flex-1 flex-column justify-start my-1 py-1 px-2 hover:bg-gray-600 rounded cursor-pointer">
              <BsPostcardHeart className=" text-gray-300 w-6 h-6 mr-2" />
              <div className=" text-gray-300 font-medium">Card</div>
            </div>
            <div
              className="flex flex-1 flex-column justify-start my-1 py-1 px-2 hover:bg-gray-600 rounded cursor-pointer"
              onClick={() => {
                state.logout();
              }}
            >
              <FiLogOut className=" text-gray-300 w-6 h-6 mr-2" />
              <div className=" text-gray-300 font-medium">Logout</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
