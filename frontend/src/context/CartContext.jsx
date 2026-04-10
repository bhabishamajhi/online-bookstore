import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (book, quantity = 1) => {
    const existing = cart.find(item => item.bookId === book._id);
    if (existing) {
      setCart(cart.map(item => item.bookId === book._id ? { ...item, quantity: item.quantity + quantity } : item));
    } else {
      setCart([...cart, { ...book, bookId: book._id, quantity }]);
    }
  };

  const removeFromCart = (bookId) => {
    setCart(cart.filter(item => item.bookId !== bookId));
  };

  const clearCart = () => setCart([]);

  const updateQuantity = (bookId, quantity) => {
    setCart(cart.map(item => item.bookId === bookId ? { ...item, quantity } : item));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};