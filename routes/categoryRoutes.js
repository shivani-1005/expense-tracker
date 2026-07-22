const express = require("express");
const router = express.Router();
const {
  getCategoriesHandler,
  updateCategoryHandler,
  createCategoryHandler,
  deleteCategoryHandler,
} = require("../controllers/categoryController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getCategoriesHandler);
router.post("/", protect, createCategoryHandler);
router.put("/:id", protect, updateCategoryHandler);
router.delete("/:id", protect, deleteCategoryHandler);

module.exports = router;
