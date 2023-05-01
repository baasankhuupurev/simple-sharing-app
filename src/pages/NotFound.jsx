import React from "react";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import robot from "../assets/images/robot.png";
export default () => {
  return (
    <div className="">
      <Navbar />
      <div className="flex flex-col items-center h-screen my-10">
        <Link
          to="/"
          className=" text-gray-700 hover:underline font-bold flex items-center"
        >
          <IoMdArrowBack className=" text-3xl" /> Go back to Home page
        </Link>
        <img src={robot} alt="Not found" />
      </div>
      <Footer />
    </div>
  );
};
