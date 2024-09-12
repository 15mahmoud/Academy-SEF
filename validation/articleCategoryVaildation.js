const ArticleCategory = require("../models/articles/articleCategory");
const Joi = require("joi");

// Validate Create Article Category

function validatecreateArticleCategory(ArticleCategory) {
  const schema = Joi.object({
    categoryName: Joi.string().min(4).max(150).required(),
    categoryDescription: Joi.string().min(5).max(1024),
    ParentCategory: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(ArticleCategory);
}

// Validate update Article Category
function validateupdateArticleCategory(ArticleCategory) {
  const schema = Joi.object({
    categoryName: Joi.string().min(4).max(150),
    categoryDescription: Joi.string().min(5).max(1024),
    ParentCategory: Joi.string().min(5).max(1024),
  });
  return schema.validate(ArticleCategory);
}

module.exports = {validatecreateArticleCategory,validateupdateArticleCategory};
