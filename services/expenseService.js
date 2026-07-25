const prisma = require("../lib/prisma");

const createExpense = async (userId, categoryId, amount, type, note, date) => {
  const expense = await prisma.expense.create({
    data: { userId, categoryId, amount, type, note, date },
  });

  return expense;
};

const getExpense = async (userId, filters = {}) => {
  const where = { userId };

  // if month filter exists, add date range
  if (filters.month) {
    // create start and end date from filters.month
    // add to where clause
    const startDate = new Date(`${filters.month}-01`);
    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      0,
    );

    where.date = {
      gte: startDate,
      lte: endDate,
    };
  }

  // if type filter exists (INCOME or EXPENSE)
  if (filters.type) {
    // add to where clause
    where.type = filters.type;
  }

  return await prisma.expense.findMany({
    where,
    orderBy: { date: "desc" },
    include: {
      category: {
        select: { name: true, color: true },
      },
    },
  });
};

const updateExpense = async (id, userId, data) => {
  const expense = await prisma.expense.update({ where: { id, userId }, data });
  return expense;
};

const deleteExpense = async (id, userId) => {
  const expense = await prisma.expense.delete({ where: { id, userId } });
  return expense;
};

module.exports = { createExpense, getExpense, updateExpense, deleteExpense };

// more accurate
// const deleteExpense = async (id, userId) => {
//   const where = { id, userId };
//   return await prisma.expense.delete({ where });
// };
