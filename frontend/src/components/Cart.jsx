import { useEffect, useState } from "react";
import { getCart, addToCart, clearCart } from "../api";

export default function Cart() {
  const userId = "user1";
  const [cart, setCart] = useState({ items: [] });

  const fetchCart = () => {
    getCart(userId)
      .then(res => {
        if (res.data && Array.isArray(res.data.items)) {
          setCart(res.data);
        } else {
          setCart({ items: [] });
        }
      })
      .catch(() => setCart({ items: [] }));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantity = (bookId, qty) => {
    if (qty < 1) return;
    addToCart({ userId, bookId, quantity: qty }).then(fetchCart);
  };

  const items = Array.isArray(cart.items) ? cart.items : [];

  const total = items.reduce(
    (sum, item) => sum + (item?.price || 0) * (item?.quantity || 0),
    0
  );

  return (
    <div>
      <h2>Cart</h2>

      {items.length === 0 ? (
        <p>Cart empty</p>
      ) : (
        <>
          {items.map(item => (
            <div key={item.bookId || Math.random()} className="border p-2 mb-2">
              <b>{item?.title || "No Title"}</b>

              <div>
                <button onClick={() => handleQuantity(item.bookId, item.quantity - 1)}>-</button>
                {item.quantity}
                <button onClick={() => handleQuantity(item.bookId, item.quantity + 1)}>+</button>
              </div>
            </div>
          ))}

          <h4>Total: ${total}</h4>

          <button onClick={() => clearCart(userId).then(fetchCart)}>
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}