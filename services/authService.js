const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../lib/prisma");

const registerUser = async (name, email, password) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("User already exist");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
const login = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};

const getCurrentUser = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true },
  });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

const updateProfile = async (userId, data) => {
  const { name, currentPassword, newPassword } = data;

  const user = await prisma.user.findUnique({ where: { id: userId } });

  const updateData = {};

  // if name provided, update it
  if (name) {
    updateData.name = name;
  }

  // if password change requested
  if (currentPassword && newPassword) {
    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) throw new Error("Current password is incorrect");
    updateData.password = await bcrypt.hash(newPassword, 10);
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: { id: true, name: true, email: true, createdAt: true },
  });

  return updated;
};
module.exports = { registerUser, login, updateProfile, getCurrentUser };
