const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const getDashboardDataHandler = require("../controllers/dashboardController");

router.get("/", protect, getDashboardDataHandler);

module.exports = router;
