const router = require("express").Router();
const ctrl = require("../controllers/bookController");

router.get("/", ctrl.getBooks);
router.get("/:id", ctrl.getBook);
router.post("/", ctrl.addBook);
router.put("/:id", ctrl.updateBook);
router.delete("/:id", ctrl.deleteBook);

module.exports = router;