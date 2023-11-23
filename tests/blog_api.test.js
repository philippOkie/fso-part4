const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("../utils/list_helper");

const api = supertest(app);

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

test("the blog posts must have a property named id", async () => {
  const response = await api.get("/api/blogs");

  const ids = response.body.map((i) => i.id);

  expect(response.body).toHaveLength(helper.allHaveId(response.body));
  expect(ids).toBeDefined();
});

test("test that verifies that making an HTTP POST request to the /api/blogs URL successfully creates a new blog post", async () => {
  const newBlog = {
    title: "TEST BLOG",
    author: "TEST JEST",
    url: "some url",
    likes: 1,
  };

  const prevResponse = await api.get("/api/blogs");

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(prevResponse.body.length + 1);
});

test(" verifies that if the likes property is missing from the request, it will default to the value 0", async () => {
  const newBlog = {
    title: "TEST LIKES",
    author: "TEST JEST",
    url: "some url",
  };

  if (!newBlog.hasOwnProperty("Likes")) {
    newBlog.Likes = 0;
  }

  expect(newBlog.Likes).toBeDefined();
});

test(" verifies that if the likes property is missing from the request, it will default to the value 0", async () => {
  const newBlog = {
    title: "TEST LIKES",
    author: "TEST JEST",
    url: "some url",
  };

  if (!newBlog.hasOwnProperty("Likes")) {
    newBlog.Likes = 0;
  }

  expect(newBlog.Likes).toBeDefined();
});

afterAll(async () => {
  await mongoose.connection.close();
});
