require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5001;

//Allow cross-origin requests from frontend, should come before express.json
app.use(
  cors({
    origin: "http://localhost:3000",
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
