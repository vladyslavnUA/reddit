var Post = require("../models/post");
var Comment = require("../models/comment");
var User = require("../models/user");

module.exports = app => {
  // NEW REPLY
  app.get("/post/:postId/comments/:commentId/replies/new", (req, res) => {
    var currentUser = req.user;
    let post;
    Post.findById(req.params.postId)
      .then(p => {
        post = p;
        return Comment.findById(req.params.commentId);
      })
      .then(comment => {

        post_id = post.id
        comment_id = comment.id

        res.render("replies-new", { post, comment, currentUser, post_id, comment_id });
      })
      .catch(err => {
        console.log(err.message);
      });
  });
  
  // CREATE REPLY
  app.post("/post/:postId/comments/:commentId/replies", (req, res) => {
    var currentUser = req.user;
    // TURN REPLY INTO A COMMENT OBJECT
    const reply = new Comment(req.body);
    // reply.author = req.user._id
    reply.author = req.user._id
    // LOOKUP THE PARENT POST
    Post.findById(req.params.postId)
        .then(post => {
            // FIND THE CHILD COMMENT
            Promise.all([
                reply.save(),
                Comment.findById(req.params.commentId),
            ])
                .then(([reply, comment]) => {
                    // ADD THE REPLY
                    comment.comments.unshift(reply._id);

                    return Promise.all([
                        comment.save(),
                    ]);
                })
                .then(() => {
                    res.redirect(`/post/${req.params.postId}`);
                })
                .catch(console.error);
            // SAVE THE CHANGE TO THE PARENT DOCUMENT
            return post.save();
        });
  });
};