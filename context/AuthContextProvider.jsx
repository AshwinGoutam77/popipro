"use client";
import React, { useEffect, useState } from "react";
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
  const [incrementCount, setIncrementCount] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCartItems = localStorage.getItem("cartItems");
      const savedIncrementCount = localStorage.getItem("incrementCount");
      setCartItems(storedCartItems ? JSON.parse(storedCartItems) : []);
      setIncrementCount(
        savedIncrementCount ? JSON.parse(savedIncrementCount) : 0
      );
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      calculateTotalPrice(cartItems);
    }
  }, [cartItems]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("incrementCount", incrementCount);
    }
  }, [incrementCount]);

  const addItemToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (productId) => {
    const newCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(newCart);
  };

  const userLogin = (info) => {
    setToken(info.token);
    if (typeof window !== "undefined") {
      localStorage.setItem("url", info.current_url);
      localStorage.setItem("token", info.token);
      localforage.setItem("url", info.current_url);
    }
  };

  const APIDATA = async () => {
    try {
      const response = await Api(
        EditData,
        {},
        "?card_url=" +
          (typeof window !== "undefined" ? localStorage.getItem("url") : "")
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
      if (error.request.status === 401 && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("url");
        window.location.href = "/login";
      }
    }
  };

  const calculateTotalPrice = (cartItems) => {
    const total = cartItems.reduce((sum, item) => sum + item.total, 0);
    setTotalPrice(total);
  };

  const incrementQuantity = (productId) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === productId) {
        const newQuantity = item.quantity + 1;
        const newTotal = item.price * newQuantity;
        if (typeof window !== "undefined") {
          localStorage.setItem(
            `product_${productId}`,
            JSON.stringify({ ...item, quantity: newQuantity, total: newTotal })
          );
        }
        return {
          ...item,
          quantity: newQuantity,
          total: newTotal,
        };
      }
      return item;
    });

    setCartItems(updatedCart);
    setIncrementCount(incrementCount + 1);
  };

  const decrementQuantity = (productId) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === productId && item.quantity > 1) {
        const newQuantity = item.quantity - 1;
        const newTotal = item.price * newQuantity;
        if (typeof window !== "undefined") {
          localStorage.setItem(
            `product_${productId}`,
            JSON.stringify({ ...item, quantity: newQuantity, total: newTotal })
          );
        }
        return {
          ...item,
          quantity: newQuantity,
          total: newTotal,
        };
      }
      return item;
    });

    setCartItems(updatedCart);
    if (incrementCount > 0) {
      setIncrementCount(incrementCount - 1);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("cartItems");
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
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        totalPrice,
        clearCart,
        incrementCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
