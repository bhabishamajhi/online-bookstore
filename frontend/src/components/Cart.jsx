import React, { useEffect, useState } from "react";
import api from "../api";

const Cart = () => {
  const [cart, setCart] = useState({ items: [] });

  const fetchCart = async () => {
    const res = await api.get("/cart/default-user");
    setCart(res.data || { items: [] });
  };

  useEffect(() => {
  let isMounted = true;

  const loadCart = async () => {
    try {
      const res = await api.get("/cart/default-user");

      if (isMounted) {
        setCart(res.data || { items: [] });
      }
    } catch (err) {
      console.log(err);
    }
  };

  loadCart();

  return () => {
    isMounted = false;
  };
}, []);

  const updateQuantity = async (item, newQty) => {
    if (newQty <= 0) {
      await api.delete(`/cart/remove/${item._id}`);
    } else {
      await api.post("/cart", {
        userId: "default-user",
        bookId: item.bookId,
        title: item.title,
        price: item.price,
        quantity: newQty,
      });
    }

    fetchCart();
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
            key={item._id}
            className="d-flex justify-content-between border p-2 mb-2"
          >
            <div>
              <b>{item.title}</b>
              <br />

              <button onClick={() =>
                updateQuantity(item, item.quantity - 1)
              }>
                -
              </button>

              <span style={{ margin: "0 10px" }}>
                {item.quantity}
              </span>

              <button onClick={() =>
                updateQuantity(item, item.quantity + 1)
              }>
                +
              </button>
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