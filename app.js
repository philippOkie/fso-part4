const express = require("express");
const cors = require("cors");
const blogRouter = require("./controllers/blogs");
const config = require("./utils/config");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);

module.exports = app;
