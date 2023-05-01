import React, { useEffect } from "react";
import { useContext } from "react";
import UserContext from "../context/userContext";

export default function Splash() {
  const state = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("SSP-token")) {
      state.setIsLogin(true);
      state.setToken(localStorage.getItem("SSP-token"));
      state.setusername(localStorage.getItem("username"));
      state.setphoto(localStorage.getItem("photo"));
      state.setemail(localStorage.getItem("email"));
      state.setrole(localStorage.getItem("role"));
      state.setUser_id(localStorage.getItem("user_id"));
    }
  });
  return <></>;
}
