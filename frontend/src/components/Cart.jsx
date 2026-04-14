import React, { useEffect, useState } from "react";
import api from "../api";

const Cart = () => {
  const [cart, setCart] = useState({ items: [] });

  const fetchCart = async () => {
    const res = await api.get("/cart/default-user");
    setCart(res.data);
  };

  useEffect(() => { fetchCart(); }, []);

  const updateQuantity = async (bookId, quantity) => {
  if (quantity < 1) {
    await api.delete(`/cart/${bookId}`, {
      data: { userId: "default-user" }
    });
  } else {
    await api.post("/cart", {
      userId: "default-user",
      bookId,
      quantity
    });
  }

  fetchCart();
};

  const total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (!cart.items.length) return <p>Cart empty</p>;

  return (
    <div className="container mt-4">
      <h3>Your Cart</h3>

      {cart.items.map(item => (
        <div key={item.bookId} className="d-flex justify-content-between border p-2 mb-2">
          <div>
            <b>{item.title}</b><br/>
            <button onClick={()=>updateQuantity(item.bookId,item.quantity-1)}>-</button>
            {item.quantity}
            <button onClick={()=>updateQuantity(item.bookId,item.quantity+1)}>+</button>
          </div>
          <div>${item.price * item.quantity}</div>
        </div>
      ))}

      <h4>Total: ${total}</h4>
    </div>
  );
};

export default Cart;