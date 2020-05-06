const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Populate = require("../utils/autopopulate");

const PostSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  title: { type: String, required: true },
  url: { type: String, required: true },
  summary: { type: String, required: true },
  subreddit: { type: String, required: true, },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  upVotes : [{ type: Schema.Types.ObjectId, ref: "User"}],
  downVotes : [{ type: Schema.Types.ObjectId, ref: "User"}],
  voteScore : {type: Number}
});

PostSchema.pre("save", function(next) {
    // SET createdAt AND updatedAt
    const now = new Date();
    this.updatedAt = now;
  
    if (!this.createdAt) {
      this.createdAt = now;
    }
  
    next();
  });

// Always populate the author field
PostSchema
    .pre('findOne', Populate('author'))
    .pre('find', Populate('author'))
    .pre('find', Populate('comments'))
    .pre('find', Populate('replies'))


module.exports = mongoose.model("Post", PostSchema);