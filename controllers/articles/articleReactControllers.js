const ArticleReact = require('../../models/articles/articleReact');

// Create a new react
exports.createReact = async (req, res) => {
  try {
    const react = new ArticleReact(req.body);
    await react.save();
    res.status(201).send(react);
  } catch (error) {
    if (error.code === 11000) { // Duplicate key error code
        res.status(400).json({ message: 'User has already reacted to this article.' });
      } else {
        res.status(500).json({ message: 'An error occurred while creating the reaction.' });
      }
  }
};

// Get all reacts for an article
exports.getReactsByArticle = async (req, res) => {
  try {
    const reacts = await ArticleReact.find({ article: req.params.articleId });
    res.status(200).send(reacts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a review by ID
exports.updateReact= async (req, res) => {
    try {
      const react = await ArticleReact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!react) {
          return res.status(404).json({ error: 'react not found' });
      }
      res.status(200).send(react);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// Delete a react by ID
exports.deleteReact = async (req, res) => {
  try {
    const react = await ArticleReact.findByIdAndDelete(req.params.id);
    if (!react) {
        return res.status(404).json({ error: 'react not found' });
    }
    res.status(200).json({ message: 'react deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
