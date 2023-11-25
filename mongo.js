const mongoose = require("mongoose");
const config = require("./utils/config");

mongoose.set("strictQuery", false);
mongoose.connect(config.MONGODB_URI);

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

const fetchData = async () => {
  try {
    const result = await Blog.find({});

    result.forEach((blog) => {
      console.log(blog);
    });

    mongoose.connection.close();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

fetchData();
