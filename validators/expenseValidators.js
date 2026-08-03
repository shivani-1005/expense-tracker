const { z } = require("zod");

const expenseSchema = z.object({
  categoryId: z.coerce.number().int().positive("categoryId must be a positive number"),
  amount: z.coerce.number().positive("amount must be a positive number"),
  type: z.enum(["INCOME", "EXPENSE"], "type must be INCOME or EXPENSE"),
  note: z.string().trim().optional().nullable(),
  date: z.coerce.date("date must be a valid date"),
});

module.exports = { expenseSchema };
