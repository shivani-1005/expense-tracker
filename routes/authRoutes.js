const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  registerHandler,
  loginHandler,
  updateProfileHandler,
} = require("../controllers/authController");

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.put("/profile", protect, updateProfileHandler);
module.exports = router;
