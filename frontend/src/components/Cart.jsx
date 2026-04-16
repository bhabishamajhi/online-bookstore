import React, { useEffect, useState } from "react";
import api from "../api";

const Cart = () => {
  const [cart, setCart] = useState({ items: [] });

  const fetchCart = async () => {
    const res = await api.get("/cart/default-user");
    setCart(res.data || { items: [] });
  };

  useEffect(() => {
  fetchCart();

  const handler = () => fetchCart();

  window.addEventListener("cartUpdated", handler);

  return () => window.removeEventListener("cartUpdated", handler);
}, []);
  const updateQuantity = async (item, newQty) => {
  try {
    if (newQty <= 0) {
      await api.post("/cart/remove", {
        userId: "default-user",
        bookId: item.bookId,
      });
    } else {
      await api.post("/cart", {
        userId: "default-user",
        bookId: item.bookId,
        title: item.title,
        price: item.price,
        quantity: 1  
      });
    }

    fetchCart();
  } catch (err) {
    console.error("Cart update error:", err);
  }
};

  const total = (cart.items || []).reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return (
    <div className="container mt-4">
      <h3>🛒 Your Cart</h3>

      {(!cart.items || cart.items.length === 0) ? (
        <p>Cart is empty</p>
      ) : (
        cart.items.map((item) => (
          <div
            key={item.bookId}
            className="d-flex justify-content-between border p-2 mb-2"
          >
            <div>
              <b>{item.title}</b>
              <br />

              <button style={{ backgroundColor: "transparent", border: "none", color: "#01070eff", cursor: "pointer" }} onClick={() => updateQuantity(item, -1)}>-</button>


              <span style={{ margin: "0 10px" }}>
                {item.quantity}
              </span>

              <button style={{ backgroundColor: "transparent", border: "none", color: "#01070eff", cursor: "pointer" }} onClick={() => updateQuantity(item, 1)}>+</button>
            </div>

            <div>${item.price * item.quantity}</div>
          </div>
        ))
      )}

      <h4>Total: ${total}</h4>
    </div>
  );
};

export default Cart;