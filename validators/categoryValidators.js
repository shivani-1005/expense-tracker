const { z } = require("zod");

const categorySchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
});

module.exports = { categorySchema };
