require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const expenseRouter = require("./routes/expenseRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const dashboardRouter = require("./routes/dashboardRoutes");
const app = express();
const PORT = process.env.PORT || 5001;

//Allow cross-origin requests from frontend, should come before express.json
// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000",
//       "https://expense-tracker-pearl-kappa-83.vercel.app",
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   }),
// );
app.use(
  cors({
    origin: function (origin, callback) {
      callback(null, true); // allow all origins temporarily
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Parse incoming JSON request bodies
app.use(express.json());

// Log every incoming request to the terminal
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/api/auth", authRouter);
app.use("/api/expense", expenseRouter);
app.use("/api/category", categoryRouter);
app.use("/api/dashboard", dashboardRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
