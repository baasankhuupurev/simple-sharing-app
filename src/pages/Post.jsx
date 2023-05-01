import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getAuthPost, getPost } from "../services/post";
import { RestApiUrl } from "../constants";
import { voteSubstr } from "../utils/getStr";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import Comments from "../components/Comments";
export default () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [collection, setCollection] = useState([]);
  useEffect(() => {
    if (id) {
      getPost(id)
        .then((response) => {
          setData(response.data.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  useEffect(() => {
    if (data && data.auth) {
      getAuthPost(data.auth._id)
        .then((res) => setCollection(res.data.data))
        .catch((err) => console.log(err));
    }
  }, [data]);
  return (
    <>
      <Navbar />
      {data && (
        <>
          <div className="laptop:flex mx-10 mt-10 mb-20">
            <div className="laptop:w-3/4 laptop:mx-10 border-gray-200 p-10 border-2 rounded-md">
              <div className="text-gray-600 text-5xl m-5 font-medium text-left">
                {data.Title}
              </div>
              <div className="laptop:flex laptop:flex-row items-center my-2 hover:cursor-pointer">
                <img
                  onClick={() => {}}
                  className="w-12 h-12 mx-2 rounded-full"
                  src={
                    data.auth.photo
                      ? RestApiUrl + "/image/auth/" + data.auth.photo
                      : RestApiUrl + "/image/auth/no-image.webp"
                  }
                  alt="Author"
                />
                <div className="">
                  <div className=" text-xs text-gray-800 capitalize font-medium">
                    {data.auth.username.split(" ")[0]}
                  </div>
                  <div className=" text-sm text-gray-400">
                    {data.CreatedAt.split("T")[0].replaceAll("-", "/")}
                    {"  ·  "}
                    {data.CreatedAt.split("T")[1].split(":")[0]}h{"  "}
                    {data.CreatedAt.split(":")[1]}m{"  ·  "} (
                    {voteSubstr("" + data.vote)} rate)
                  </div>
                </div>
              </div>
              <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
            </div>
            <div className="laptop:w-1/4 laptop:h-1/2">
              <div className="p-5 border-2 border-gray-200 rounded-xl">
                <img
                  className=" w-16 h-16 rounded-full"
                  src={
                    data.auth.photo
                      ? RestApiUrl + "/image/auth/" + data.auth.photo
                      : RestApiUrl + "/image/auth/no-image.webp"
                  }
                  alt="Author"
                />
                <div className="py-2 font-medium text-sm">
                  {data.auth.username}
                </div>
                <div className=" text-gray-500 text-xs">{data.auth.about}</div>
                <div className=" text-gray-600 font-medium mt-1">Community</div>
                <div className="flex flex-1 ">
                  <a className=" bg-gray-500 mr-3 px-3 text-gray-50 hover:bg-gray-200 hover:text-gray-500  font-medium rounded cursor-pointer">
                    JOIN
                  </a>
                  <a className="bg-gray-500 px-3 hover:bg-gray-200 font-medium rounded cursor-pointer">
                    <MdOutlineMarkEmailUnread className=" w-6 h-6  text-gray-200 font-medium hover:text-gray-500" />
                  </a>{" "}
                </div>
                <div className=" text-gray-600 font-medium mt-1">
                  Collection
                </div>
                <div className=" grid grid-cols-1 tablet:grid-cols-43laptop:grid-cols-4 desktop:grid-cols-5">
                  {collection &&
                    collection.length > 0 &&
                    collection.map((el) => {
                      return (
                        <a href={`${el._id}`} className="rounded-full">
                          <img
                            onClick={() => {}}
                            className="w-11 h-11 rounded-full"
                            src={el.Banner}
                            alt={el.Title}
                            title={el.Title}
                          />
                        </a>
                      );
                    })}
                </div>
              </div>
              <div className="my-2 p-5 border-2 border-gray-200 rounded-xl">
                <Comments postid={id} />
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};
