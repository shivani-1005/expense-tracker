const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");
const { handleError } = require("../lib/httpErrors");

const createCategoryHandler = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name } = req.body;
    const category = await createCategory(userId, name);
    res
      .status(201)
      .json({ success: true, category, message: "Created Successfully" });
  } catch (error) {
    handleError(res, error);
  }
};

const getCategoriesHandler = async (req, res) => {
  try {
    const userId = req.user.userId;
    const category = await getCategories(userId);
    res
      .status(200)
      .json({ success: true, data: category, message: "Fetched Successfully" });
  } catch (error) {
    handleError(res, error);
  }
};

const updateCategoryHandler = async (req, res) => {
  try {
    const userId = req.user.userId;
    const id = req.params.id;
    const { name } = req.body;
    const category = await updateCategory(parseInt(id), userId, { name });
    res
      .status(200)
      .json({ success: true, data: category, message: "Updated Successfully" });
  } catch (error) {
    handleError(res, error);
  }
};

const deleteCategoryHandler = async (req, res) => {
  try {
    const userId = req.user.userId;
    const id = req.params.id;
    await deleteCategory(parseInt(id), userId);
    res.status(204).send();
  } catch (error) {
    handleError(res, error);
  }
};
module.exports = {
  getCategoriesHandler,
  updateCategoryHandler,
  createCategoryHandler,
  deleteCategoryHandler,
};
