import React, { createContext, useState } from "react";
import axios from "axios";
import { RestApiUrl } from "../constants";
export const UserStore = (props) => {
  const [token, setToken] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [Overread, setOverread] = useState(false);
  const [toastMsg, setToastMsg] = useState("Please wait a moment ...");
  const [username, setusername] = useState(null);
  const [email, setemail] = useState(null);
  const [photo, setphoto] = useState(null);
  const [role, setrole] = useState(null);
  const [User_id, setUser_id] = useState(null);
  const signin = (email, password) => {
    axios
      .post(`${RestApiUrl}/api/users/signin`, {
        email: email ? email.trim() : email,
        password: password ? password.trim() : password,
      })
      .then((result) => {
        loginUserSuccessful(result.data.token, result.data.user);
      })
      .catch((err) => {
        loginFailed(err.response.data.message);
      });
  };

  const signup = (username, phone, email, password) => {
    axios
      .post(`${RestApiUrl}/api/users/signup`, {
        username,
        phone,
        email,
        password,
      })
      .then((result) => {
        loginUserSuccessful(result.data.token, result.data.user);
      })
      .catch((err) => {
        loginFailed(err.response.data.message);
      });
  };
  const loginUserSuccessful = async (token, user) => {
    localStorage.setItem("SSP-token", token);
    localStorage.setItem("username", user.username);
    localStorage.setItem("email", user.email);
    localStorage.setItem("photo", user.photo);
    localStorage.setItem("role", user.role);
    localStorage.setItem("user_id", user._id);
    setToastMsg("Success login (:");
    setIsLogin(true);
    setToken(token);
  };
  const loginFailed = (error) => {
    setToastMsg(error);
    setIsLogin(false);
    setToken(null);
  };
  const logout = async () => {
    localStorage.removeItem("SSP-token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("photo");
    localStorage.removeItem("role");
    localStorage.removeItem("user_id");
    setToastMsg("Log out");
    setIsLogin(false);
    setToken(null);
  };
  return (
    <UserContext.Provider
      value={{
        toastMsg,
        setToastMsg,
        token,
        setToken,
        isLogin,
        setIsLogin,
        Overread,
        setOverread,
        logout,
        signin,
        signup,
        username,
        photo,
        email,
        role,
        User_id,
        setusername,
        setemail,
        setphoto,
        setrole,
        setUser_id,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
const UserContext = createContext();
export default UserContext;
