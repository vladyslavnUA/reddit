const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports = (app) => {
  app.post("/post/:postId/comments", (req, res) => {
      // INSTANTIATE INSTANCE OF MODEL
      const comment = new Comment(req.body);
    
      // SAVE INSTANCE OF Comment MODEL TO DB
      comment.save()
          .then(comment => {
              return Post.findById(req.params.postId);
          })
          .then(post => {
            post.comments.unshift(comment);
              return post.save();
          })
          .then(post => {
              return res.redirect('/');
          })
          .catch(err => {
              console.log(err);
          });
    });
};