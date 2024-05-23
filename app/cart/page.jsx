"use client";
import React, { useState, useEffect } from "react";

const ShoppingCart = () => {
  const defaultItems = [
    { id: 1, name: "Item 1", price: 10.0, quantity: 1, total: 10.0 },
    { id: 2, name: "Item 2", price: 15.0, quantity: 1, total: 15.0 },
    { id: 3, name: "Item 3", price: 20.0, quantity: 1, total: 20.0 },
  ];

  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : defaultItems;
  });

  const [incrementCount, setIncrementCount] = useState(() => {
    const savedIncrementCount = localStorage.getItem("incrementCount");
    return savedIncrementCount ? JSON.parse(savedIncrementCount) : 0;
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("incrementCount", incrementCount);
  }, [incrementCount]);

  const incrementQuantity = (productId) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === productId) {
        const newQuantity = item.quantity + 1;
        return {
          ...item,
          quantity: newQuantity,
          total: newQuantity * item.price,
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
        return {
          ...item,
          quantity: newQuantity,
          total: newQuantity * item.price,
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
    localStorage.removeItem("cartItems");
    setIncrementCount(0);
    localStorage.removeItem("incrementCount");
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <button onClick={clearCart}>Clear Cart</button>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <span>{item.name}</span>
            <span> Quantity: {item.quantity}</span>
            <span> Price: {item.price.toFixed(2)}</span>
            <span> Total: {item.total.toFixed(2)}</span>
            <button onClick={() => incrementQuantity(item.id)}>+</button>
            <button onClick={() => decrementQuantity(item.id)}>-</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingCart;
