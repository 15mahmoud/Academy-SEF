const Joi = require("joi");

// Validate Create Article
function validateCreateArticle(article) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required().messages({
      "string.min":
        "Less than the number of characters allowed, The minimum length is 5",
      "any.required": "Title is required",
    }),
    status: Joi.string().valid("Draft", "Published").default("Draft"),
    content: Joi.string().required().messages({
      "any.required": "The Content is required",
    }),
    publishDate: Joi.date().optional(),
    coverPhoto: Joi.string()
      .uri()
      .default("https://i.postimg.cc/nzSxXqPQ/image.jpg"),
    createdBy: Joi.string().required(),
    updatedBy: Joi.string(),
    categoryId: Joi.string(),
  });
  return schema.validate(article);
}

// Validate Update Article
function validateUpdateArticle(article) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).messages({
      "string.min":
        "Less than the number of characters allowed, The minimum length is 5",
    }),
    status: Joi.string().valid("Draft", "Published"),
    content: Joi.string(),
    publishDate: Joi.date(),
    coverPhoto: Joi.string().uri(),
    createdBy: Joi.string(),
    updatedBy: Joi.string().required(),
    categoryId: Joi.string(),
  });
  return schema.validate(article);
}

module.exports = { validateCreateArticle, validateUpdateArticle };
