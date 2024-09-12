const ArticleComment = require('../../models/articles/articleComment');

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const comment = new ArticleComment(req.body);
    await comment.save();
    res.status(201).send(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all comments for an article
exports.getCommentsByArticle = async (req, res) => {
  try {
    const comments = await ArticleComment.find({ article: req.params.articleId });
    res.status(200).send(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single comment by ID
exports.getCommentById = async (req, res) => {
  try {
    const comment = await ArticleComment.findById(req.params.id);
    if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(200).send(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a comment by ID
exports.updateComment = async (req, res) => {
  try {
    const comment = await ArticleComment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(200).send(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a comment by ID
exports.deleteComment = async (req, res) => {
  try {
    const comment = await ArticleComment.findByIdAndDelete(req.params.id);
    if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
