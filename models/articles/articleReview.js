const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema(
    {
      article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
        trim: true,
        minlength: [5, "Review comment must be at least 5 characters long"],
        maxlength: [1000, "Review comment cannot exceed 1000 characters"],
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },
    { timestamps: true }
  );
  
  const ArticleReview = mongoose.model('ArticleReview', reviewSchema);
  module.exports = ArticleReview;
  