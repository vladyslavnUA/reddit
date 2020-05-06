const Post = require('../models/post');
const User = require('../models/user');

module.exports = app => {
  // NEW POST
  app.get('/post/new', (req, res) => {
    var currentUser = req.user;
    res.render('posts-new', { currentUser });
  })

  app.post("/post/new", (req, res) => {
    if (req.user) {
        var post = new Post(req.body);
        post.author = req.user._id;
        var post = new Post(req.body);
        post.author = req.user._id;
        post.upVotes = [];
        post.downVotes = [];
        post.voteScore = 0;
        post
            .save()
            .then(post => {
                return User.findById(req.user._id);
            })
            .then(user => {
                user.posts.unshift(post);
                user.save();
                // REDIRECT TO THE NEW POST
                res.redirect(`/post/${post._id}`);
            })
            .catch(err => {
                console.log(err.message);
            });
    } else {
        return res.status(401); // UNAUTHORIZED
    }
  });

  // INDEX
  app.get('/', (req, res) => {
    var currentUser = req.user;

    Post.find({}).populate('author').lean()
      .then(posts => {
          res.render("posts-index", { posts, currentUser });
      })
      .catch(err => {
          console.log(err.message);
      });
  });

  // FIND POST
  app.get('/post/:id', function(req, res) {
    var currentUser = req.user;

    // LOOK UP THE POST
    Post.findById(req.params.id).populate({path:'comments', populate: {path: 'author'}}).populate('author').lean()
      .then(post => {
        res.render("posts-show", { 
          post, currentUser
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  // SUBREDDIT
  app.get("/n/:subreddit", function(req, res) {
    var currentUser = req.user;
    Post.find({ subreddit: req.params.subreddit }).populate('author').lean()
      .then(posts => {
        res.render("posts-index", { posts, currentUser });
      })
      .catch(err => {
        console.log(err);
      });
  });

  // VOTING
  app.put("/posts/:id/vote-up", function(req, res) {
    Post.findById(req.params.id).exec(function(err, post) {
      post.upVotes.push(req.user._id);
      post.voteScore = post.voteScore + 1;
      post.save();
  
      res.status(200);
    });
  });
  
  app.put("/posts/:id/vote-down", function(req, res) {
    Post.findById(req.params.id).exec(function(err, post) {
      post.downVotes.push(req.user._id);
      post.voteScore = post.voteScore - 1;
      post.save();
  
      res.status(200);
    });
  });
};