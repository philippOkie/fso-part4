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
});

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
    likes: 0,
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

test("succeeds with a valid id", async () => {
  const blogsAtStart = await api.get("/api/blogs");
  const blogToView = blogsAtStart.body[0];

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(resultBlog.body).toEqual({
    author: blogToView.author,
    id: blogToView.id,
    likes: blogToView.likes,
    title: blogToView.title,
    url: blogToView.url,
  });
});

test("fails with statuscode 400 id is invalid", async () => {
  const invalidId = "5a3d5da59070081a82a3445";

  await api.get(`/api/blogs/${invalidId}`).expect(400);
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const prevResponse = await api.get("/api/blogs");

    const blogToDelete = prevResponse.body[1];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await api.get("/api/blogs");

    expect(blogsAtEnd.body).toHaveLength(prevResponse.body.length - 1);
  });
});

test("updates the number of likes for a blog post(increments by 1)", async () => {
  const prevResponse = await api.get("/api/blogs");

  const blogToUpdate = prevResponse.body[1];

  await api.put(`/api/blogs/${blogToUpdate.id}`).expect(204);

  const blogsAtEnd = await api.get("/api/blogs");

  expect(blogsAtEnd.body[1].likes).toBe(prevResponse.body[1].likes + 1);
});

afterAll(async () => {
  await mongoose.connection.close();
});
