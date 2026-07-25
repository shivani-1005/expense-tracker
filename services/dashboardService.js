const prisma = require("../lib/prisma");

const getDashboardData = async (userId, month) => {
  const where = { userId };

  if (month) {
    const startDate = new Date(`${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    where.date = {
      gte: startDate,
      lt: endDate,
    };
  }

  const incomeResult = await prisma.expense.aggregate({
    where: {
      ...where,
      type: "INCOME",
    },
    _sum: {
      amount: true,
    },
  });

  const expenseResult = await prisma.expense.aggregate({
    where: {
      ...where,
      type: "EXPENSE",
    },
    _sum: {
      amount: true,
    },
  });

  const totalIncome = incomeResult._sum.amount || 0;
  const totalExpense = expenseResult._sum.amount || 0;

  const balance = totalIncome - totalExpense;

  const recentTransactions = await prisma.expense.findMany({
    where,
    orderBy: {
      date: "desc",
    },
    include: {
      category: {
        select: { name: true, color: true },
      },
    },
    take: 5,
  });

  return {
    totalIncome,
    totalExpense,
    balance,
    recentTransactions,
  };
};

module.exports = getDashboardData;
