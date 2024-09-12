const ArticleReview = require('../../models/articles/articleReview');

// Create a new review
exports.createReview = async (req, res) => {
  try {
    const review = new ArticleReview(req.body);
    await review.save();
    res.status(201).send(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all reviews for an article
exports.getReviewsByArticle = async (req, res) => {
  try {
    const reviews = await ArticleReview.find({ article: req.params.articleId });
    res.status(200).send(reviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single review by ID
exports.getReviewById = async (req, res) => {
  try {
    const review = await ArticleReview.findById(req.params.id);
    if (!review) {
        return res.status(404).json({ error: 'review not found' });
    }
    res.status(200).send(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a review by ID
exports.updateReview = async (req, res) => {
  try {
    const review = await ArticleReview.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!review) {
        return res.status(404).json({ error: 'review not found' });
    }
    res.status(200).send(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a review by ID
exports.deleteReview = async (req, res) => {
  try {
    const review = await ArticleReview.findByIdAndDelete(req.params.id);
    if (!review) {
        return res.status(404).json({ error: 'review not found' });
    }
    res.status(200).json({ message: 'review deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });  }
};
