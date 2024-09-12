const mongoose = require('mongoose');
const { Schema } = mongoose;
const reactSchema = new Schema(
    {
      article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
        required: true,
        
      },
      reactionType: {
        type: String,
        enum: ['Like', 'Love', 'Haha', 'Wow', 'Sad', 'Angry'],
        required: true,
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },
    { timestamps: true }
  );
  
// Creating a compound index to ensure uniqueness of user reactions on an article
reactSchema.index({ article: 1, createdBy: 1 }, { unique: true });
  const ArticleReact = mongoose.model('ArticleReact', reactSchema);
  module.exports = ArticleReact;

  