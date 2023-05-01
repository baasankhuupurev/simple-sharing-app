import React, { useContext, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import UserContext from "../context/userContext";
import { RestApiUrl } from "../constants";
import { getAuthPost } from "../services/post";
import { getUser } from "../services/user";
export default () => {
  const state = useContext(UserContext);
  const [collection, setCollection] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  useEffect(() => {
    getUser(state.token, state.User_id)
      .then((res) => {
        setUserProfile(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));
    getAuthPost(state.User_id)
      .then((res) => setCollection(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {userProfile && (
        <div className="flex flex-row justify-center min-h-screen bg-gray-800">
          <div className="w-1/4"></div>
          <div className="w-2/4 flex flex-col p-5 overflow-auto border-l border-r border-gray-500">
            <div className="my-2 p-2 rounded shadow-gray-700 shadow-sm">
              <IoIosArrowRoundBack
                onClick={() => window.history.go(-1)}
                className="text-2xl cursor-pointer rounded-full border border-gray-400 text-gray-400 hover:border-white hover:text-white"
              />
              <img
                src={`${RestApiUrl + "/image/auth/" + state.photo}`}
                alt="Author"
                className="max-w-24 max-h-24 rounded-full mx-auto border-2 border-gray-400"
              />
              <div className=" items-center">
                <div className=" text-xl text-center text-gray-200 font-bold">
                  {userProfile.username}
                </div>
                <div className="font-medium text-xs text-center text-green-500 capitalize cursor-pointer hover:underline">
                  edit profile
                </div>
              </div>
            </div>
            <div className="my-2 p-2 rounded shadow-gray-700 shadow-sm">
              <div className="m-4">
                <h1 className=" text-2xl text-gray-200  border-b border-b-gray-600">
                  About
                </h1>
                <p className="text-xs text-gray-200 mt-2">
                  &nbsp;&nbsp;&nbsp;{userProfile.about}
                </p>
              </div>
            </div>
            <div className="my-2 p-2 rounded shadow-gray-700 shadow-sm">
              <div className="m-4">
                <h1 className=" text-2xl text-gray-200 border-b border-b-gray-600">
                  Information
                </h1>
                <div className="grid grid-cols-2">
                  <div className="flex">
                    <p className="text-xs text-white mt-2 font-medium">
                      Email:{" "}
                    </p>
                    <p className=" text-xs text-gray-300 mt-2">
                      &nbsp;&nbsp;{userProfile.email}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="text-xs text-white mt-2 font-medium">
                      Phone:{" "}
                    </p>
                    <p className=" text-xs text-gray-300 mt-2">
                      &nbsp;&nbsp;{userProfile.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {collection && (
              <div className="my-2 p-2 rounded shadow-gray-700 shadow-sm">
                <div className="m-4">
                  <h1 className=" text-2xl text-gray-200">Collection</h1>
                  <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4">
                    {collection.map((el) => {
                      console.log(el);
                      return (
                        <a
                          className="w-full h-2/3 px-1 py-1 rounded relative"
                          href={`post/${el._id}`}
                        >
                          <div
                            className="flex bottom-2 right-3 absolute justify-center items-center bg-green-600 px-1"
                            style={{ fontSize: 10 }}
                          >
                            <FaHeart className=" text-white" />
                            <div
                              className=" text-white"
                              style={{ fontSize: 10 }}
                            >
                              {el.vote}
                            </div>
                          </div>
                          <img
                            className="w-full h-full rounded hover:border-2 border-gray-800"
                            src={el.Banner}
                            alt={el.Title}
                            title={el.Title}
                          />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            <div className=" my-2 p-2 rounded shadow-gray-700 shadow-sm">
              <div className="m-4">
                <h1 className=" text-2xl text-gray-200">Stats</h1>
                <div className="flex">
                  <div></div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/4"></div>
        </div>
      )}
    </>
  );
};
