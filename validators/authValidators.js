const { z } = require("zod");

const registerSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("A valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().trim().email("A valid email is required"),
  password: z.string().min(1, "Password is required"),
});

const updateProfileSchema = z
  .object({
    name: z.string().trim().min(1).optional(),
    currentPassword: z.string().min(1).optional(),
    newPassword: z.string().min(6).optional(),
  })
  .refine((data) => data.name || (data.currentPassword && data.newPassword), {
    message: "Nothing to update",
  });

module.exports = { registerSchema, loginSchema, updateProfileSchema };
