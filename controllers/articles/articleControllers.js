const Article = require("../../models/articles/article");
const ArticleCategory = require("../../models/articles/articleCategory");
const ArticleReact = require("../../models/articles/articleReact");
const ArticleReview = require("../../models/articles/articleReview");
const ArticleComment = require("../../models/articles/articleComment");
const {
  validateupdateArticleCategory,
  validatecreateArticleCategory,
} = require("../../validation/articleCategoryVaildation");
const {
  validateCreateArticle,
  validateUpdateArticle,
} = require("../../validation/articleVaildation");

const createArticle = async (req, res) => {
  try {
    const { error } = validateCreateArticle(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const newArticle = new Article(req.body);
    await newArticle.save();
    res.status(200).json({
      message: "Article Created successfully"
      , newArticle
    })

    // res.redirect("http://localhost:3000/api/articles/index"); // إعادة التوجيه إلى صفحة الإنشاء بعد الحفظ
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate(
      "categoryId",
      "categoryName categoryDescription"
    ); // جلب المقالات مع اسم ووصف الفئة

    res.status(200).json(articles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getArticleById = async (req, res) => {
  try {
    const articleId = req.params.id;

    // Find the article by ID and populate category and createdBy
    const article = await Article.findById(articleId)
      .populate("categoryId", "categoryName categoryDescription")
      .populate("createdBy", "firstName lastName email")
      .populate("updatedBy", "firstName lastName email");
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    // Fetch reviews related to the article
    const reviews = await ArticleReview.find({ article: articleId })
      .populate("createdBy", "firstName lastName email")
      .select("rating comment createdAt");

    // Fetch comments related to the article
    const comments = await ArticleComment.find({ article: articleId })
      .populate("createdBy", "firstName lastName email")
      .select("content createdAt");

    // Fetch reacts related to the article
    const reacts = await ArticleReact.find({ article: articleId })
      .populate("createdBy", "firstName lastName email")
      .select("type createdAt");

    // Return the article along with its category, reviews, comments, and reacts
    res.status(200).json({
      article,
      reviews,
      comments,
      reacts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const editArticle = async (req, res) => {
  try {
    const articleId = req.params.id;

    // Find the article by ID and populate the category
    const article = await Article.findById(articleId).populate(
      "categoryId",
      "categoryName categoryDescription"
    );

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    // Get the category related to the article
    const category = await ArticleCategory.findById(article.categoryId);

    if (!category) {
      return res
        .status(404)
        .json({ message: "Category not found for this article" });
    }

    // Send the article and the category for editing
    res.status(200).json({
      article,
      category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = validateUpdateArticle(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const updates = req.body;
    updates.updatedAt = Date.now(); // Update the `updatedAt` field

    const updatedArticle = await Article.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.status(200).json(updatedArticle);
    //res.redirect(`http://localhost:3000/api/articles/view/${id}`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedArticle = await Article.findByIdAndDelete(id);

    if (!deletedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.status(200).json({ message: "Article deleted successfully" });
    // res.redirect("http://localhost:3000/api/articles/index"); // إعادة التوجيه إلى صفحة الإنشاء بعد الحفظ
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



///comments
const createComment = async (req, res) => {
  try {
    //const { articleId } = req.params; // احصل على articleId من الرابط
    const commentData = {
      ...req.body,
      // article: articleId, // تعيين articleId في الكومنت
    };

    // إنشاء تعليق جديد
    const comment = new ArticleComment(commentData);
    await comment.save();

    res.status(201).send(comment);
    //res.redirect(`http://localhost:3000/api/articles/view/${comment.article}`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getCommentById = async (req, res) => {
  try {
    const comment = await ArticleComment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).send(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id; // استرجاع commentId من الرابط

    // حذف التعليق باستخدام commentId
    const deletedComment = await ArticleComment.findByIdAndDelete(commentId);

    // التحقق مما إذا كان التعليق موجودًا أم لا
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // إرسال رد بعد الحذف
    res.status(200).json({ message: "Comment deleted successfully" });
    //  res.redirect(`http://localhost:3000/api/articles/view/${articleId}`);
  } catch (error) {
    // في حال حدوث خطأ أثناء الحذف
    res.status(500).json({ error: error.message });
  }
};
const updateComment = async (req, res) => {
  try {
    const commentId = req.params.id; // استرجاع commentId و articleId من الرابط
    const { content } = req.body; // البيانات الجديدة المراد تحديثها

    // التحقق من وجود التعليق
    const comment = await ArticleComment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // تحديث التعليق
    comment.content = content || comment.content; // تحديث فقط إذا كان هناك بيانات جديدة
    await comment.save(); // حفظ التحديث
    res.status(200).json(comment);

    // إعادة التوجيه بعد التحديث إلى عرض المقالة
    // res.redirect(`http://localhost:3000/api/articles/view/${comment.article}`);
  } catch (error) {
    // في حال حدوث خطأ أثناء التحديث
    res.status(500).json({ error: error.message });
  }
};

const createReact = async (req, res) => {
  try {
    //  const articleId  = req.params; // احصل على articleId من الرابط
    const reactData = {
      ...req.body,
      //  article: articleId, // تعيين articleId في الكومنت
    };

    const react = new ArticleReact(reactData);
    await react.save();
    res.status(201).send(react);
    //   res.redirect(`http://localhost:3000/api/articles/view/${react.article}`);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error code
      res
        .status(400)
        .json({ message: "User has already reacted to this article." });
    } else {
      res
        .status(500)
        .json({ message: "An error occurred while creating the reaction." });
    }
  }
};
const deleteReact = async (req, res) => {
  try {
    const reactId = req.params.id; // استرجاع reactId و articleId من الرابط

    // حذف التفاعل باستخدام reactId
    const deletedReact = await ArticleReact.findByIdAndDelete(reactId);

    // التحقق مما إذا كان التفاعل موجودًا
    if (!deletedReact) {
      return res.status(404).json({ message: "React not found" });
    }
    res.status(200).json({ message: "react deleted successfully" });

    // إعادة التوجيه بعد الحذف إلى عرض المقالة
    //  res.redirect(`http://localhost:3000/api/articles/view/${articleId}`);
  } catch (error) {
    // في حال حدوث خطأ أثناء الحذف
    res.status(500).json({ error: error.message });
  }
};
const updateReact = async (req, res) => {
  try {
    const reactId = req.params.id; // Extract reactId and articleId from the URL
    const { reactionType } = req.body; // The new reaction type (e.g., 'like', 'love', etc.)

    // Find the react by ID
    const react = await ArticleReact.findById(reactId);
    if (!react) {
      return res.status(404).json({ message: "Reaction not found" });
    }

    // Update the reaction type
    react.reactionType = reactionType || react.reactionType; // Update only if a new type is provided
    await react.save(); // Save the updated reaction
    res.status(200).json(react);

    // Redirect after update to the article view page
    //   res.redirect(`http://localhost:3000/api/articles/view/${review.article}`);
  } catch (error) {
    // Handle any errors during the update process
    res.status(500).json({ error: error.message });
  }
};

const createReview = async (req, res) => {
  try {
    // const articleId  = req.params; // احصل على articleId من الرابط
    const reviewData = {
      ...req.body,
      // article: articleId, // تعيين articleId في الكومنت
    };
    const review = new ArticleReview(reviewData);
    await review.save();
    res.status(201).send(review);
    // res.redirect(`http://localhost:3000/api/articles/view/${review.article}`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id; // استرجاع reviewId و articleId من الرابط

    // حذف المراجعة باستخدام reviewId
    const deletedReview = await ArticleReview.findByIdAndDelete(reviewId);

    // التحقق مما إذا كانت المراجعة موجودة
    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ message: "review deleted successfully" });

    // إعادة التوجيه بعد الحذف إلى عرض المقالة
    //  res.redirect(`http://localhost:3000/api/articles/view/${articleId}`);
  } catch (error) {
    // في حال حدوث خطأ أثناء الحذف
    res.status(500).json({ error: error.message });
  }
};
const updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { rating, reviewText } = req.body;

    const review = await ArticleReview.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // تحديث المراجعة
    review.rating = rating || review.rating;
    review.reviewText = reviewText || review.reviewText;
    await review.save(); // حفظ التحديث

    res.status(200).json(review);
    // إعادة التوجيه بعد التحديث إلى عرض المقالة
    // res.redirect(`http://localhost:3000/api/articles/view/${review.article}`);
  } catch (error) {
    // في حال حدوث خطأ أثناء التحديث
    res.status(500).json({ error: error.message });
  }
};
const getReviewById = async (req, res) => {
  try {
    const reviewId = req.params.id;

    // Find the review by its ID and populate the user and article fields if needed
    const review = await ArticleReview.findById(reviewId)
      .populate("createdBy", "firstName lastName email") // Populate the user info
      .populate("article", "title"); // Optionally populate the article info

    // If review doesn't exist
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Return the review data
    res.status(200).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await ArticleCategory.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const createCategory = async (req, res) => {
  try {
    const { error } = validatecreateArticleCategory(req.body);
    const category = await ArticleCategory.create(req.body);
    await category.save();
    res.status(201).json(category);
    // res.redirect("http://localhost:3000/api/articles/index");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getCategoryById = async (req, res) => {
  try {
    const category = await ArticleCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const updateCategory = async (req, res) => {
  try {
    const { error } = validateupdateArticleCategory(req.body);
    const category = await ArticleCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
    //res.redirect("http://localhost:3000/api/articles/index");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const category = await ArticleCategory.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
    // res.redirect("http://localhost:3000/api/articles/index");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createArticle,
  getAllCategories,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  editArticle,

  getCommentById,
  getReviewById,
  getCategoryById,

  createComment,
  createReview,
  createReact,
  createCategory,

  updateComment,
  updateReview,
  updateReact,
  updateCategory,

  deleteComment,
  deleteReact,
  deleteReview,
  deleteCategory,
};
