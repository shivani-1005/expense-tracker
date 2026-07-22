const prisma = require("../lib/prisma");

const createCategory = async (name, color) => {
  const category = await prisma.category.create({ data: { name, color } });
  return category;
};

const getCategories = async () => {
  const categories = await prisma.category.findMany();
  return categories;
};

const updateCategory = async (id, data) => {
  const category = await prisma.category.update({ where: { id }, data });
  return category;
};
const deleteCategory = async (id) => {
  const category = await prisma.category.delete({ where: { id } });
  return category;
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
