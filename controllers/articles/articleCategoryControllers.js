const ArticleCategory = require('../../models/articles/articleCategory');
const asyncHandler = require("express-async-handler");
const {
    validateupdateArticleCategory,
    validatecreateArticleCategory,
  } = require("../../validation/articleCategoryVaildation");
// Create a new Article Category
exports.createCategory = async (req, res) => {
  try {
    const { error } = validatecreateArticleCategory(req.body);
    const category = await ArticleCategory.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Article Categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await ArticleCategory.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single Article Category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await ArticleCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an Article Category by ID
exports.updateCategory = async (req, res) => {
  try {
    const { error } = validateupdateArticleCategory(req.body);
    const category = await ArticleCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an Article Category by ID
exports.deleteCategory = async (req, res) => {
  try {
    const category = await ArticleCategory.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
