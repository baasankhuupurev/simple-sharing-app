import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../context/userContext";
import Navbar from "../components/Navbar";
import CustomLabel from "../components/CustomLabel";
export default () => {
  const [email, setEmail] = useState("auth1@gmail.com");
  const [password, setPassword] = useState("12345678");
  const state = useContext(UserContext);
  const navigate = useNavigate();
  const onHandlerSign = () => {
    if (email && password) {
      state.signin(email, password);
      navigate("/", { replace: true });
    } else {
      state.setToastMsg("Мэдээллээ гүйцэт оруулна уу");
    }
  };
  return (
    <>
      <Navbar />
      <div className="min-h-screen py-10 bg-gray-800">
        <div className="grid place-items-center mx-2 my-20 sm:my-auto">
          <div
            className="w-full p-12 bg-white rounded-lg shadow-md"
            style={{ maxWidth: "500px" }}
          >
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Sign In
            </h2>
            <div className="mt-6">
              <div className="space-y-6">
                <CustomLabel
                  label="Email"
                  placeholder="Email address"
                  type="email"
                  onChange={setEmail}
                  value={email}
                />
                <CustomLabel
                  label="Password"
                  placeholder="Password"
                  type="password"
                  onChange={setPassword}
                  value={password}
                />
                <div>
                  <button
                    onClick={onHandlerSign}
                    className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
                  >
                    Sign In
                  </button>
                  <p className="mt-4 text-center">
                    <Link to="/sign-up" className="underline">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
