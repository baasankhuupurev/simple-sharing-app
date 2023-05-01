import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CustomLabel from "../components/CustomLabel";
import Navbar from "../components/Navbar";
import UserContext from "../context/userContext";

export default () => {
  const [username, setUserName] = useState("author");
  const [phone, setPhone] = useState("99090101");
  const [email, setEmail] = useState("auth1@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [confirmpassword, setConfirmPassword] = useState("12345678");

  const state = useContext(UserContext);
  const navigate = useNavigate();
  const onHandlerSignup = () => {
    if (!username || !phone || !email || !password || !confirmpassword) {
      state.setToastMsg("Мэдээллээ гүйцэт бөглөнө үү");
    } else if (confirmpassword !== password) {
      state.setToastMsg("Нууц үг хоорондоо таарахгүй байна");
    } else {
      state.signup(username, phone, email, password);
      navigate("/", { replace: true });
    }
  };
  return (
    <>
      <Navbar />
      <div className=" py-10 min-h-screen bg-gray-800">
        <div className="grid place-items-center mx-2 my-20 sm:my-auto">
          <div
            className="w-full p-12 bg-white rounded-lg shadow-md"
            style={{ maxWidth: "500px" }}
          >
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Sign Up
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
                  label="Phone"
                  placeholder="Phone number"
                  type="tel"
                  onChange={setPhone}
                  value={phone}
                />

                <CustomLabel
                  label="Username"
                  placeholder="Username"
                  type="text"
                  onChange={setUserName}
                  value={username}
                />
                <CustomLabel
                  label="Password"
                  placeholder="Password"
                  type="password"
                  onChange={setPassword}
                  value={password}
                />
                <CustomLabel
                  label="Confirm Password"
                  placeholder="Password"
                  type="password"
                  onChange={setConfirmPassword}
                  value={confirmpassword}
                />
                <div className=" text-sm text-gray-600 hover:underline cursor-pointer p-0 m-0">
                  Forgot password
                </div>
                <div>
                  <button
                    onClick={onHandlerSignup}
                    className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
                  >
                    Sign Up
                  </button>
                  <p className="mt-4 text-center">
                    <a href="/sign-in" className="underline">
                      Sign In
                    </a>
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
