const Article = require("../../models/articles/article");


// Create a new article
const createArticle = async (req, res) => {
    try {  
      const newArticle = new Article(req.body);
      await newArticle.save();
      res.status(200).json(newArticle);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Get all articles
  const getAllArticles = async (req, res) => {
    try {
      const articles = await Article.find({});
      res.status(200).json(articles);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Get an article by ID
const getArticleById = async (req, res) => {
    try {
      const { id } = req.params;
      const article = await Article.findById(id);
  
      if (!article) {
        return res.status(404).json({ error: 'Article not found' });
      }
      res.status(200).json(article);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Update an article by ID
  const updateArticle = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      updates.updatedAt = Date.now(); // Update the `updatedAt` field
  
      const updatedArticle = await Article.findByIdAndUpdate(id, updates, { new: true });
  
      if (!updatedArticle) {
        return res.status(404).json({ error: 'Article not found' });
      }
  
      res.status(200).json(updatedArticle);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Delete an article by ID
  const deleteArticle = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedArticle = await Article.findByIdAndDelete(id);
  
      if (!deletedArticle) {
        return res.status(404).json({ error: 'Article not found' });
      }
  
      res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  module.exports = {
    createArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
    deleteArticle
  };