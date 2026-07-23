const getDashboardData = require("../services/dashboardService");

const getDashboardDataHandler = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { month } = req.query;

    const dashboardData = await getDashboardData(userId, month);

    res.status(200).json({
      success: true,
      data: dashboardData,
      message: "Successfully fetched dashboard data",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data",
    });
  }
};
module.exports = getDashboardDataHandler;
