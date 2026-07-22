const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  createExpenseHandler,
  getExpenseHandler,
  updateExpenseHandler,
  deleteExpenseHandler,
} = require("../controllers/expenseController");

router.get("/", protect, getExpenseHandler);
router.post("/", protect, createExpenseHandler);
router.put("/:id", protect, updateExpenseHandler);
router.delete("/:id", protect, deleteExpenseHandler);

module.exports = router;
