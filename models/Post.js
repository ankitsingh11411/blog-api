const mongoose = require('mongoose');

const postSchema = new mongoose.Schema([
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    descr: {
      type: String,
      required: true,
    },
  },
  {
    author: {
      type: String,
      required: true,
    },
  },
]);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
