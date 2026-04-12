import { useEffect, useState } from "react";
import { getCart, addToCart, clearCart } from "../api";

export default function Cart() {
  const userId = "user1";
  const [cart, setCart] = useState({ items: [] });

  const fetchCart = () => getCart(userId).then(res => setCart(res.data || { items: [] }));

  useEffect(() => { fetchCart(); }, []);

  const handleQuantity = (bookId, qty) => {
  if (qty < 1) return;
  addToCart({ userId, bookId, quantity: qty }).then(fetchCart);
};

  const handleClear = () => clearCart(userId).then(fetchCart);

  const items = cart?.items || [];

const total = items.reduce(
  (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
  0
);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      if (!cart || !cart.items) return <p>Loading...</p>;
      {items.length === 0 ? <p>Cart is empty</p> : (
        <div>
          {cart.items.map(item => (
            <div key={item.bookId} className="flex justify-between border p-2 mb-2">
              <div>
                <p className="font-semibold">{item.title}</p>
                <p>Price: ${item.price}</p>
              </div>
              <div className="flex items-center space-x-2">
                <input type="number" min="1" value={item.quantity} onChange={e => handleQuantity(item.bookId, Number(e.target.value))} className="border p-1 w-16" />
              </div>
            </div>
          ))}
          <p className="font-bold mt-2">Total: ${total}</p>
          <button onClick={handleClear} className="bg-red-500 text-white px-4 py-2 rounded mt-2">Clear Cart</button>
          if (!cart || !cart.items) return <p>Loading cart...</p>;
        </div>
      )}
    </div>
  );
}