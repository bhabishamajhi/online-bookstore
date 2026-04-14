const Cart = require("../models/Cart");

exports.getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addToCart = async (req, res) => {
  const { userId, bookId, title, price, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (i) => i.bookId === bookId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
    } else {
      cart.items.push({ bookId, title, price, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeItem = async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.json({ items: [] });

    cart.items = cart.items.filter(
      (i) => i.bookId !== bookId
    );

    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.clearCart = async (req, res) => {
  const { userId } = req.params;

  try {
    await Cart.findOneAndUpdate(
      { userId },
      { items: [] }
    );

    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};