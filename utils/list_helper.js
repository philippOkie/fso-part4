const _ = require("lodash");
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let sum = 0;
  for (let i = 0; i < blogs.length; i++) {
    sum = sum + blogs[i].likes;
  }
  return sum;
};

const allHaveId = (blogs) => {
  let sum = 0;
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].id) {
      sum++;
    }
  }
  return sum;
};

const favoriteBlog = (blogs) => {
  let fav = 0;
  let toReturn;
  for (let i = 0; i < blogs.length; i++) {
    if (fav < blogs[i].likes) {
      fav = blogs[i].likes;
      toReturn = blogs[i];
    }
  }
  return toReturn;
};

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null;
  }

  let authors = _.countBy(blogs, "author");
  let maxAuthor = _.maxBy(_.keys(authors), (author) => authors[author]);

  return {
    author: maxAuthor,
    blogs: authors[maxAuthor],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  allHaveId,
};
