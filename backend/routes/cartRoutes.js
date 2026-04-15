const router = require("express").Router();
const ctrl = require("../controllers/cartController");

router.get("/:userId", ctrl.getCart);
router.post("/", async (req, res) => {
  const { userId, bookId, title, price, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ bookId, title, price, quantity }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.bookId === bookId
      );

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 0) + quantity;
      } else {
        cart.items.push({ bookId, title, price, quantity });
      }
    }

    await cart.save();
    res.json(cart);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/remove", ctrl.removeItem);

router.delete("/:userId", ctrl.clearCart);

module.exports = router;