const express = require("express");
require("express-async-errors");
const cors = require("cors");
const blogRouter = require("./controllers/blogs");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");

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

app.use("/api/blogs", blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
