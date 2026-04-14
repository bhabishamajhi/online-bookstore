const router = require("express").Router();
const ctrl = require("../controllers/cartController");

router.post("/", ctrl.addToCart);
router.get("/:userId", ctrl.getCart);

router.post("/remove", ctrl.removeFromCart);

router.delete("/:userId", ctrl.clearCart);

module.exports = router;