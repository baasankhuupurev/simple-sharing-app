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
        <div className="flex min-h-screen flex-row justify-center bg-gray-800">
          <div className="tablet:hidden laptop:w-1/4"></div>
          <div className="flex flex-col overflow-auto border-l border-r border-gray-500 p-5 laptop:w-2/4">
            <div className="my-2 rounded p-2 shadow-sm shadow-gray-700">
              <IoIosArrowRoundBack
                onClick={() => window.history.go(-1)}
                className="cursor-pointer rounded-full border border-gray-400 text-2xl text-gray-400 hover:border-white hover:text-white"
              />
              <img
                src={`${RestApiUrl + "/image/auth/" + state.photo}`}
                alt="Author"
                className=" max-w-24 mx-auto max-h-24 rounded-full border-2 border-gray-400"
              />
              <div className=" items-center">
                <div className=" text-center text-xl font-bold text-gray-200">
                  {userProfile.username}
                </div>
                <div className="cursor-pointer text-center text-xs font-medium capitalize text-green-500 hover:underline">
                  edit profile
                </div>
              </div>
            </div>
            <div className="my-2 rounded p-2 shadow-sm shadow-gray-700">
              <div className="m-4">
                <h1 className=" border-b border-b-gray-600  text-2xl text-gray-200">
                  About
                </h1>
                <p className="mt-2 text-xs text-gray-200">
                  &nbsp;&nbsp;&nbsp;{userProfile.about}
                </p>
              </div>
            </div>
            <div className="my-2 rounded p-2 shadow-sm shadow-gray-700">
              <div className="m-4">
                <h1 className=" border-b border-b-gray-600 text-2xl text-gray-200">
                  Information
                </h1>
                <div className="grid grid-cols-2">
                  <div className="flex">
                    <p className="mt-2 text-xs font-medium text-white">
                      Email:{" "}
                    </p>
                    <p className=" mt-2 text-xs text-gray-300">
                      &nbsp;&nbsp;{userProfile.email}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="mt-2 text-xs font-medium text-white">
                      Phone:{" "}
                    </p>
                    <p className=" mt-2 text-xs text-gray-300">
                      &nbsp;&nbsp;{userProfile.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {collection && (
              <div className="my-2 rounded p-2 shadow-sm shadow-gray-700">
                <div className="m-4">
                  <h1 className=" text-2xl text-gray-200">Collection</h1>
                  <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4">
                    {collection.map((el) => {
                      console.log(el);
                      return (
                        <a
                          className="relative h-2/3 w-full rounded px-1 py-1"
                          href={`post/${el._id}`}
                        >
                          <div
                            className="absolute bottom-2 right-3 flex items-center justify-center bg-green-600 px-1"
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
                            className="h-full w-full rounded border-gray-800 hover:border-2"
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
            <div className=" my-2 rounded p-2 shadow-sm shadow-gray-700">
              <div className="m-4">
                <h1 className=" text-2xl text-gray-200">Stats</h1>
                <div className="flex">
                  <div></div>
                </div>
              </div>
            </div>
          </div>
          <div className="tablet:hidden laptop:w-1/4"></div>
        </div>
      )}
    </>
  );
};
