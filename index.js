const express = require('express');
const app = express();
const database = require('./config/db');
const Post = require('./models/Post');
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('This is the blog api');
});

app.get('/api/', (req, res) => {
  res.status(200).json({ message: 'api is working fine' });
});

app.get('/api/posts/', (req, res) => {
  Post.find({})
    .then((data) => {
      res.status(200).json(data);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err });
    });
});

app.get('/api/posts/:id', (req, res) => {
  let postid = req.params.id;
  Post.find({ _id: postid })
    .then((data) => {
      res.status(200).json(data);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err });
    });
});

app.post('/api/posts/', (req, res) => {
  let newPost = new Post({
    title: req.body.title,
    descr: req.body.descr,
    author: req.body.author,
  });

  newPost
    .save()
    .then((data) => {
      res.status(200).json({ message: 'post created successfully' });
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err });
    });
});

app.put('/api/posts/:id', (req, res) => {
  let postid = req.params.id;
  let newInfo = {
    title: req.body.title,
    descr: req.body.descr,
    author: req.body.author,
  };
  Post.findByIdAndUpdate(postid, newInfo)
    .then((data) => {
      res.status(200).json({ message: 'post updated successfully' });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

app.delete('/api/posts/:id', (req, res) => {
  let postid = req.params.id;
  Post.findByIdAndDelete(postid)
    .then(() => {
      res.status(200).json({ message: 'post deleted successfully' });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

database()
  .then(() => console.log('successfully connected to db'))
  .catch((err) => console.log(err));

app.listen(port, (err) => {
  if (!err) {
    console.log(`app is successfully running on port ${port}`);
  }
});
