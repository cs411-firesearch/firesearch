/*
 * Serve JSON to our AngularJS client
 */

// For a real app, you'd make database requests here.
// For this example, "data" acts like an in-memory "database"
var data = {
  "posts": [
    {
      "title": "Lorem ipsum",
      "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      "title": "Sed egestas",
      "text": "Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus."
    }
  ]
};

// GET

var db = require('../db/db')
var utils = require('../utils/utils')

exports.posts = function (req, res) {
  // var posts = [];
  // data.posts.forEach(function (post, i) {
  //   posts.push({
  //     id: i,
  //     title: post.title,
  //     text: post.text.substr(0, 50) + '...'
  //   });
  // });
  // console.log(posts);
  // res.json({
  //   posts: posts
  // });
  
  db.readAll(function(err, rows) {
    res.json({
      posts: rows
    });
  });

};

exports.post = function (req, res) {
  // var id = req.params.id;
  // if (id >= 0 && id < data.posts.length) {
  //   res.json({
  //     post: data.posts[id]
  //   });
  // } else {
  //   res.json(false);
  // }
  var id = req.params.id;
  db.read(id, function(err, row) {
    if (utils.isEmpty(row)) {
      res.json(false);
    } else {
      res.json({
        post: row
      })
    }
  })

};

// POST

exports.addPost = function (req, res) {
  // data.posts.push(req.body);
  // res.json(req.body);
  db.insert(req.body, function(err, newRow) {
    if (utils.isEmpty(newRow)) {
      res.json(false);
    } else {
      res.json(newRow[0]);
    }
  })
};

// PUT

exports.editPost = function (req, res) {
  // var id = req.params.id;

  // if (id >= 0 && id < data.posts.length) {
  //   data.posts[id] = req.body;
  //   res.json(true);
  // } else {
  //   res.json(false);
  // }
  var id = req.params.id;
  db.update(id, req.body, function(err, newRow) {
    if (utils.isEmpty(newRow)) {
      res.json(false);
    } else {
      res.json(newRow[0]);
    }
  })
};

// DELETE

exports.deletePost = function (req, res) {
  // var id = req.params.id;

  // if (id >= 0 && id < data.posts.length) {
  //   data.posts.splice(id, 1);
  //   res.json(true);
  // } else {
  //   res.json(false);
  // }
  var id = req.params.id;
  db.remove(id, function(err) {
    res.json({})
  })
};