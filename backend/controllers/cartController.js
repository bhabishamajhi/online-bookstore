exports.removeFromCart = async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.json({ items: [] });

    cart.items = cart.items.filter(item => item.bookId !== bookId);

    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};