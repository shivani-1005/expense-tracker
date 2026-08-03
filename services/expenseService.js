const prisma = require("../lib/prisma");
const { getMonthDateRange } = require("../lib/dateRange");

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
    const { startDate, endDate } = getMonthDateRange(filters.month);

    where.date = {
      gte: startDate,
      lt: endDate,
    };
  }

  // if type filter exists (INCOME or EXPENSE)
  if (filters.type) {
    // add to where clause
    where.type = filters.type;
  }

  return await prisma.expense.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      category: {
        select: { name: true },
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
