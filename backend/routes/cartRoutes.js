const router = require("express").Router();
const ctrl = require("../controllers/cartController");

router.get("/:userId", ctrl.getCart);

router.post("/", ctrl.addToCart);

router.post("/remove", ctrl.removeItem);

router.delete("/:userId", ctrl.clearCart);

module.exports = router;