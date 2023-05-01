import React from "react";
import { UserStore } from "./context/userContext";
import Router from "./Router";
import "./App.css";
export default function App() {
  return (
    <UserStore>
      <Router />
    </UserStore>
  );
}
