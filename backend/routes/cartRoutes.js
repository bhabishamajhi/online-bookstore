const router = require("express").Router();
const ctrl = require("../controllers/cartController");

router.post("/", ctrl.addToCart);
router.get("/:userId", ctrl.getCart);
router.delete("/:userId", ctrl.clearCart);

module.exports = router;