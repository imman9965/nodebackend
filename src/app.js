const express = require("express");
const cors = require("cors");
const sessionMiddleware = require("./config/session");
const authRoutes = require("./router/auth");
const userRoutes = require("./router/user");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(sessionMiddleware);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app;
