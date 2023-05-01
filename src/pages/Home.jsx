import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Item from "../components/Item";
import { getPosts } from "../services/post";
import UserContext from "../context/userContext";
import CustomSearch from "../components/CustomSearch";
export default () => {
  const [items, setItems] = useState(null);
  const state = useContext(UserContext);
  const [search, setSearch] = useState("");
  useEffect(() => {
    getPosts()
      .then((res) => {
        setItems(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [state.Overread]);
  const filterData = items
    ? items.filter((item) =>
        item.Title.toLowerCase().includes(search.toLowerCase())
      )
    : "";
  return (
    <div className="min-h-screen mb-10 bg-gray-800 ">
      <Navbar>
        <CustomSearch onChange={(e) => setSearch(e.target.value)} />
      </Navbar>
      {filterData && filterData.length > 0 && (
        <div className="px-20 py-10 grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4">
          {filterData.map((post, index) => (
            <Item key={index} {...post} />
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};
