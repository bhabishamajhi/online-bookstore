const Cart = require("../models/cartModel");

exports.getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [],
      });
    }

    res.json({
      userId: cart.userId,
      items: cart.items || [],
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.addToCart = async (req, res) => {
  let { userId, bookId, title, price, quantity } = req.body;
try {
    quantity = Number(quantity);

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ bookId, title, price, quantity }],
      });
    } else {
      const index = cart.items.findIndex(
  item => item.bookId === bookId
);

if (index > -1) {
  cart.items[index].quantity += quantity;
} else {
  cart.items.push({ bookId, title, price, quantity });
}

    await cart.save();
    res.json(cart);

  }
} catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.removeItem = async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) return res.json({});

    const index = cart.items.findIndex(
      item => item.bookId === bookId
    );

    if (index > -1) {
      cart.items[index].quantity -= 1;

      if (cart.items[index].quantity <= 0) {
        cart.items.splice(index, 1);
      }
    }

    await cart.save();
    res.json(cart);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};