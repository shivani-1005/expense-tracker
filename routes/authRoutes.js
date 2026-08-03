const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validate");
const {
  registerSchema,
  loginSchema,
  updateProfileSchema,
} = require("../validators/authValidators");

const {
  registerHandler,
  loginHandler,
  updateProfileHandler,
  logoutHandler,
  meHandler,
} = require("../controllers/authController");

// Login/register are the only unauthenticated write endpoints, which
// makes them the target for password brute-forcing / account-creation
// spam. Cap attempts per IP instead of leaving them unthrottled.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: "Too many attempts, please try again later" },
});

router.post("/register", authLimiter, validate(registerSchema), registerHandler);
router.post("/login", authLimiter, validate(loginSchema), loginHandler);
router.post("/logout", logoutHandler);
router.get("/me", protect, meHandler);
router.put(
  "/profile",
  protect,
  validate(updateProfileSchema),
  updateProfileHandler,
);
module.exports = router;
