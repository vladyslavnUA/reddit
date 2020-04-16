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
  // CREATE
  app.post('/post/new', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body);
    
    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, post) => {
    // REDIRECT TO THE ROOT
    return res.redirect(`/`);
    })
  });
  app.get('/', (req, res) => {
    Post.find({}).lean()
      .then(posts => {
          res.render("posts-index", { posts });
      })
      .catch(err => {
          console.log(err.message);
      });
  });
  app.get('/post/new', (req, res) => res.render('posts-new'));
  // app.get('/posts/:id', postController.getPost);
};

// 