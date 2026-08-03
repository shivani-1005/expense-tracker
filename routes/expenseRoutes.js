const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validate");
const { expenseSchema } = require("../validators/expenseValidators");

const {
  createExpenseHandler,
  getExpenseHandler,
  updateExpenseHandler,
  deleteExpenseHandler,
} = require("../controllers/expenseController");

router.get("/", protect, getExpenseHandler);
router.post("/", protect, validate(expenseSchema), createExpenseHandler);
router.put("/:id", protect, validate(expenseSchema), updateExpenseHandler);
router.delete("/:id", protect, deleteExpenseHandler);

module.exports = router;
