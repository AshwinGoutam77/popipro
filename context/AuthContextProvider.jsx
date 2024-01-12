"use client";

import React, { ReactNode, useState } from "react";
import { AuthContext } from "./AuthContext";
import localforage from "localforage";

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState([]);
  const userLogin = (info) => {
    setToken(info.token);
    console.log(info.token);
    localStorage.setItem("url", info.current_url);
    localStorage.setItem("token", info.token);
    localforage.setItem("url", info.current_url);
  };
  return (
    <AuthContext.Provider
      value={{
        token,
        userLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
