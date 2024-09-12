const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article',
      required: true,
    },
    content: {
      type: String,
      required: [true, "Comment content is required"],
      trim: true,
      minlength: [3, "Comment must be at least 3 characters long"],
      maxlength: [500, "Comment cannot exceed 500 characters"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const ArticleComment = mongoose.model('ArticleComment', commentSchema);
module.exports = ArticleComment;
