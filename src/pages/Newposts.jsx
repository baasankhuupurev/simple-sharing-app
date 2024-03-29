import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Editable from "../components/Editable";

export default () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen labtop:px-20 tablet:px-5 tablet:mb-20 py-10 bg-gray-800  ">
        <Editable />
      </div>
      <Footer />
    </>
  );
};
