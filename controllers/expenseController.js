const {
  createExpense,
  getExpense,
  updateExpense,
  deleteExpense,
} = require("../services/expenseService");

const createExpenseHandler = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { categoryId, amount, type, note, date } = req.body;
    if (!userId || !categoryId || !amount || !type) {
      throw new Error("userId,category,type and amount are required");
    }
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
    res.status(500).json({ success: false, messaage: "Something went wrong" });
  }
};

const updateExpenseHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.userId;
    const { categoryId, amount, type, note, date } = req.body;
    if (!userId || !categoryId || !amount || !type) {
      throw new Error("userId,category,type and amount are required");
    }
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
    res.status(500).json({ success: false, messaage: "Something went wrong" });
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
      .json({ success: true, data: expense, message: "Succesfully fetched" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const deleteExpenseHandler = async (req, res) => {
  try {
    const userId = req.user.userId;
    const id = req.params.id;
    if (!id || !userId) {
      throw new Error("userId,id are required");
    }
    const expense = await deleteExpense(parseInt(id), userId);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ success: false, messaage: "Something went wrong" });
  }
};

module.exports = {
  createExpenseHandler,
  getExpenseHandler,
  updateExpenseHandler,
  deleteExpenseHandler,
};
