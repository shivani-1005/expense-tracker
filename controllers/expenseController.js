const {
  createExpense,
  getExpense,
  updateExpense,
  deleteExpense,
} = require("../services/expenseService");
const { ValidationError, handleError } = require("../lib/httpErrors");

const createExpenseHandler = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { categoryId, amount, type, note, date } = req.body;
    const expense = await createExpense(
      userId,
      categoryId,
      amount,
      type,
      note,
      date,
    );

    res.status(201).json({
      success: true,
      data: expense,
      message: "Expense created successfully",
    });
  } catch (error) {
    handleError(res, error);
  }
};

const updateExpenseHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.userId;
    const { categoryId, amount, type, note, date } = req.body;
    const expense = await updateExpense(parseInt(id), userId, {
      categoryId,
      amount,
      type,
      note,
      date,
    });

    res.status(200).json({
      success: true,
      data: expense,
      message: "Expense update successfully",
    });
  } catch (error) {
    handleError(res, error);
  }
};

const getExpenseHandler = async (req, res) => {
  const userId = req.user.userId;
  try {
    const { type, month } = req.query;
    const expense = await getExpense(userId, {
      type,
      month,
    });
    res
      .status(200)
      .json({ success: true, data: expense, message: "Successfully fetched" });
  } catch (error) {
    handleError(res, error);
  }
};

const deleteExpenseHandler = async (req, res) => {
  try {
    const userId = req.user.userId;
    const id = req.params.id;
    if (!id || !userId) {
      throw new ValidationError("userId,id are required");
    }
    await deleteExpense(parseInt(id), userId);

    res.status(204).send();
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  createExpenseHandler,
  getExpenseHandler,
  updateExpenseHandler,
  deleteExpenseHandler,
};
