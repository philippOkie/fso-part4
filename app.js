const express = require("express");
const cors = require("cors");
require("express-async-errors");
const mongoose = require("mongoose");

const blogRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

const middleware = require("./utils/middleware");
const config = require("./utils/config");
const logger = require("./utils/logger");

mongoose.set("strictQuery", false);

const app = express();

(async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("Error connecting to MongoDB:", error);
  }
})();

app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
