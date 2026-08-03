const prisma = require("../lib/prisma");

const createCategory = async (userId, name) => {
  const category = await prisma.category.create({
    data: { userId, name },
  });
  return category;
};

const getCategories = async (userId) => {
  const categories = await prisma.category.findMany({ where: { userId } });
  return categories;
};

const updateCategory = async (id, userId, data) => {
  const category = await prisma.category.update({
    where: { id, userId },
    data,
  });
  return category;
};
const deleteCategory = async (id, userId) => {
  const category = await prisma.category.delete({ where: { id, userId } });
  return category;
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
