const {
  login,
  registerUser,
  updateProfile,
} = require("../services/authService");

const registerHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "name,email,password are required" });
    }
    const user = await registerUser(name, email, password);
    res.status(201).json({ success: true, user, message: "User Registered" });
  } catch (error) {
    if (error.message === "User already exist") {
      return res.status(409).json({ success: false, error: error.message });
    }
    res.status(500).json({
      success: false,
      error: "Somethnig went wrong",
    });
  }
};

const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const token = await login(email, password);
    const user = await getUserByEmail(email);
    res
      .status(200)
      .json({ success: true, message: "Login successful", token, user });
  } catch (error) {
    res.status(401).json({ success: false, error: error.message });
  }
};

const updateProfileHandler = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, currentPassword, newPassword } = req.body;

    if (!name && !currentPassword && !newPassword) {
      return res
        .status(400)
        .json({ success: false, error: "Nothing to update" });
    }
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

module.exports = { registerHandler, loginHandler, updateProfileHandler };
