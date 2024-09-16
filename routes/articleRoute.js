const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articles/articleControllers");


// Create a new article
router.get("/create", articleController.createArticle);
router.post("/save", articleController.createArticle);
router.get("/index", articleController.getAllArticles);
router.get("/", articleController.getAllArticles);
router.get("/view/:id", articleController.getArticleById);
router.get("/edit/:id", articleController.editArticle);
router.put("/update/:id", articleController.updateArticle);
router.delete("/delete/:id", articleController.deleteArticle);

//article comment routes
router.post("/comment/create", articleController.createComment);
router.get("/comment/edit/:id", articleController.getCommentById);
router.put("/comment/update/:id", articleController.updateComment);
router.delete("/comment/delete/:id", articleController.deleteComment);

//article react routes
router.post("/react/create", articleController.createReact);
router.put("/react/update/:id", articleController.updateReact);
router.delete("/react/delete/:id", articleController.deleteReact);

//article review routes
router.post("/review/create", articleController.createReview);
router.get("/review/edit/:id", articleController.getReviewById);
router.put("/review/update/:id", articleController.updateReview);
router.delete("/review/delete/:id", articleController.deleteReview);

//article category routes 
router.post("/category/create", articleController.createCategory);
router.get("/category/index", articleController.getAllCategories);
router.get("/category/edit/:id", articleController.getCategoryById);
router.put("/category/update/:id", articleController.updateCategory);
router.delete("/category/delete/:id", articleController.deleteCategory);

module.exports = router;
