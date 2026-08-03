const {
  login,
  registerUser,
  updateProfile,
  getCurrentUser,
} = require("../services/authService");
const { authCookieOptions } = require("../lib/authCookie");

const registerHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await registerUser(name, email, password);
    res.status(201).json({ success: true, user, message: "User Registered" });
  } catch (error) {
    if (error.message === "User already exist") {
      return res.status(409).json({ success: false, error: error.message });
    }
    res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
};

const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await login(email, password);
    res.cookie("token", token, authCookieOptions);
    res
      .status(200)
      .json({ success: true, message: "Login successful", user });
  } catch (error) {
    res.status(401).json({ success: false, error: error.message });
  }
};

const logoutHandler = (req, res) => {
  res.clearCookie("token", authCookieOptions);
  res.status(200).json({ success: true, message: "Logged out" });
};

const meHandler = async (req, res) => {
  try {
    const user = await getCurrentUser(req.user.userId);
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(401).json({ success: false, error: "Not authorized" });
  }
};

const updateProfileHandler = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, currentPassword, newPassword } = req.body;
    const result = await updateProfile(userId, {
      name,
      currentPassword,
      newPassword,
    });

    res.status(200).json({
      success: true,
      data: result,
      message: "Profile updated successfully",
    });
  } catch (error) {
    if (error.message === "Current password is incorrect") {
      return res.status(400).json({ success: false, error: error.message });
    }
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

module.exports = {
  registerHandler,
  loginHandler,
  updateProfileHandler,
  logoutHandler,
  meHandler,
};
