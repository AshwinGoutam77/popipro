"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import localforage from "localforage";
import Api from "@services/Api";
import { EditData } from "@services/Routes";

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState([]);
  const [UserData, setUserData] = useState("");
  const [PlanData, setPlanData] = useState("");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const addItemToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const userLogin = (info) => {
    setToken(info.token);
    localStorage.setItem("url", info.current_url);
    localStorage.setItem("token", info.token);
    localforage.setItem("url", info.current_url);
  };
  const APIDATA = async () => {
    try {
      const response = await Api(
        EditData,
        {},
        "?card_url=" + localStorage.getItem("url")
      );
      if (response.data.status) {
        setUserData(response?.data?.data);
        setPlanData(response?.data?.data?.plan);
        document.documentElement.style.setProperty(
          "--color",
          response.data.data.card.color_code
        );
        document.documentElement.style.setProperty(
          "--themecolor",
          response.data.data.card.background_color
        );
        const color = getComputedStyle(
          document.documentElement
        ).getPropertyValue("--color");
      }
    } catch (error) {
      if (error.request.status == "401") {
        localStorage.removeItem("token");
        localStorage.removeItem("url");
        window.location.href = "/login";
      }
    }
  };
  return (
    <AuthContext.Provider
      value={{
        token,
        userLogin,
        APIDATA,
        UserData,
        PlanData,
        cartItems,
        addItemToCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
