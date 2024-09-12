const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Article Category Schema
const ArticleCategorySchema = new mongoose.Schema(
  {
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
      required: true,
    },
    categoryName: {
      type: String,
      trim: true,
      required: [true, "category Name is required"],
      minlength: [4, "category Name must be at least 4 characters long"],
      maxlength: [150, "category Name cannot exceed 150 characters"],
      unique: true,
    },
    categoryDescription: {
      type: String,
      trim: true,
      minlength: [5, "category Description must be at least 5 characters long"],
      maxlength: [1024, "category Description cannot exceed 1024 characters"],
    },
    ParentCategory: {
      type: String,
      trim: true,
      required: [true, "Parent Category is required"],
      minlength: [5, "Parent Category must be at least 5 characters long"],
      maxlength: [1024, "Parent Category cannot exceed 1024 characters"],
    },

    CreatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Article Category  model

const ArticleCategory = mongoose.model(
  "ArticleCategory",
  ArticleCategorySchema
);

module.exports = ArticleCategory;
