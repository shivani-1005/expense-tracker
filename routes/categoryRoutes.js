const express = require("express");
const router = express.Router();
const {
  getCategoriesHandler,
  updateCategoryHandler,
  createCategoryHandler,
  deleteCategoryHandler,
} = require("../controllers/categoryController");
const { protect } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validate");
const { categorySchema } = require("../validators/categoryValidators");

router.get("/", protect, getCategoriesHandler);
router.post("/", protect, validate(categorySchema), createCategoryHandler);
router.put(
  "/:id",
  protect,
  validate(categorySchema.partial()),
  updateCategoryHandler,
);
router.delete("/:id", protect, deleteCategoryHandler);

module.exports = router;
