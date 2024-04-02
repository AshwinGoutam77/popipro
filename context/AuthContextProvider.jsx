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
  const [totalPrice, setTotalPrice] = useState(0);
  const [increaseCount, setIncreaseCount] = useState(0);
  const [incrementCount, setIncrementCount] = useState(1);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }

    const storedIncrementCount = localStorage.getItem("incrementCount");
    if (storedIncrementCount) {
      setIncrementCount(parseInt(storedIncrementCount));
    }
  }, []);

  const addItemToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (productId) => {
    const newCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(newCart);
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
        document.documentElement.style.setProperty("--color", "#24b1e6");
        document.documentElement.style.setProperty("--header-color", "#24b1e6");
        document.documentElement.style.setProperty("--themecolor", "#dfeef8");
        document.documentElement.style.setProperty("--text-color", "#ffffff");
      }
    } catch (error) {
      if (error.request.status == "401") {
        localStorage.removeItem("token");
        localStorage.removeItem("url");
        window.location.href = "/login";
      }
    }
  };

  const incrementQuantity = (productId) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    setCartItems(updatedCart);
    // calculateTotalPrice(updatedCart);
  };

  const decrementQuantity = (productId) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === productId && item.quantity > 1) {
        setIncrementCount(incrementCount - 1);
        localStorage.setItem("incrementCount", incrementCount - 1);
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
    // calculateTotalPrice(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
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
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        totalPrice,
        increaseCount,
        clearCart,
        incrementCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
