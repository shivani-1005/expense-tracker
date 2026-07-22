const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");

const createCategoryHandler = async (req, res) => {
  try {
    const { name, color } = req.body;
    if (!name) {
      throw new Error("Name is required");
    }
    const category = await createCategory(name, color);
    res
      .status(201)
      .json({ success: true, category, message: "Created Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getCategoriesHandler = async (req, res) => {
  try {
    const category = await getCategories();
    res
      .status(200)
      .json({ success: true, data: category, message: "Fetched Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateCategoryHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, color } = req.body;
    const category = await updateCategory(parseInt(id), { name, color });
    res
      .status(200)
      .json({ success: true, data: category, message: "Updated Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteCategoryHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await deleteCategory(parseInt(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = {
  getCategoriesHandler,
  updateCategoryHandler,
  createCategoryHandler,
  deleteCategoryHandler,
};
