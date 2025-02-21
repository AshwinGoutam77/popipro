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
  const [Loader, setLoader] = useState(false);
  const [TodoData, setTodoData] = useState("");
  const [CartLoader, setCartLoader] = useState(false)

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
    setCartLoader(true)
    setCartItems([...cartItems, item]);
    setCartLoader(false)
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
        setTodoData(response?.data?.data?.card?.card_todo);
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

  const [data, setData] = useState(null);
  const [ErrorData, setErrorData] = useState(false)
  const fetchData = async (profile) => {
    setLoader(true);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_MODE === "development"
          ? `https://dev.popipro.com/api/get-card-data/?card_url=${profile}`
          : `https://admin.popipro.com/api/get-card-data/?card_url=${profile}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          cache: "no-store",
        }
      );

      const resp = await response.json();

      if (!response.ok) {
        setErrorData(resp);
      }

      if (!resp || !resp.data) {
        throw new Error("Invalid response data. Please try again later.");
      }
      setData(resp);
      if (resp.data.card) {
        document.documentElement.style.setProperty("--color", resp.data.card.color_code);
        document.documentElement.style.setProperty("--header-color", resp.data.card.banner_color);
        document.documentElement.style.setProperty("--themecolor", resp.data.card.background_color);
        document.documentElement.style.setProperty("--text-color", resp.data.card.text_color);
      }
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    } finally {
      setLoader(false);
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
        setCartItems,
        fetchData,
        data,
        Loader,
        setTodoData,
        TodoData,
        setData,
        CartLoader,
        ErrorData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
