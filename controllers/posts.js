const Post = require('../models/post');

// module.exports = app => {
//   // CREATE
//   app.post('/posts/new', (req, res) => {
//     // INSTANTIATE INSTANCE OF POST MODEL
//     const post = new Post(req.body);

//     // SAVE INSTANCE OF POST MODEL TO DB
//     post.save((err, post) => {
//     // REDIRECT TO THE ROOT
//     return res.redirect(`/`);
//     })
//   });
// };

module.exports = app => {
  app.post('/post/new', (req, res) => {
    const post = new Post(req.body);
    post.save((err, post) => {
    // REDIRECT TO THE ROOT
    return res.redirect(`/`);
    })
  });

  // FIND POST
  app.get('/', (req, res) => {
    Post.find({}).lean()
      .then(posts => {
          res.render("posts-index", { posts });
      })
      .catch(err => {
          console.log(err.message);
      });
  });

  app.get('/post/new', (req, res) => {

    res.render('posts-new');
  });
  app.get('/post/:id', function(req, res) {
    // LOOK UP THE POST
    Post.findById(req.params.id).lean()
      .then(post => {
        console.log(post)
        res.render("posts-show", { 
          title: post.title,
          post: JSON.parse(JSON.stringify(post))
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  // SUBREDDIT
  app.get("/n/:subreddit", function(req, res) {
    Post.find({ subreddit: req.params.subreddit }).lean()
      .then(posts => {
        res.render("posts-index", { posts });
      })
      .catch(err => {
        console.log(err);
      });
  });
};

// 