const mongoose = require('mongoose');

async function database() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Blogdb');
}

module.exports = database;
