const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articles/articleControllers');
const ArticleCommentControllers = require('../controllers/articles/articleCommentControllers');
const ArticleReactControllers = require('../controllers/articles/articleReactControllers');
const ArticleReviewControllers = require('../controllers/articles/articleReviewControllers');
const ArticleCategoryControllers = require('../controllers/articles/articleCategoryControllers');

// articleroutes
// Create a new article
router.post('/create', articleController.createArticle);
// Get all articles
router.get('/index', articleController.getAllArticles);
// Get a single article by ID
router.get('/view/:id', articleController.getArticleById);
// Update an article by ID
router.patch('/update/:id', articleController.updateArticle);
// Delete an article by ID
router.delete('/delete/:id', articleController.deleteArticle);

//article comment routes
router.post('/comment/create', ArticleCommentControllers.createComment);
router.get('/comment/:articleId', ArticleCommentControllers.getCommentsByArticle);
router.get('/comment/view/:id', ArticleCommentControllers.getCommentById);
router.patch('/comment/update/:id', ArticleCommentControllers.updateComment);
router.delete('/comment/delete/:id', ArticleCommentControllers.deleteComment);

//article react routes
router.post('/react/create', ArticleReactControllers.createReact);
router.get('/react/:articleId', ArticleReactControllers.getReactsByArticle);
router.patch('/react/update/:id', ArticleReactControllers.updateReact);
router.delete('/react/delete/:id', ArticleReactControllers.deleteReact);

//article review routes
router.post('/review/create', ArticleReviewControllers.createReview);
router.get('/review/:articleId', ArticleReviewControllers.getReviewsByArticle);
router.get('/review/view/:id', ArticleReviewControllers.getReviewById);
router.patch('/review/update/:id', ArticleReviewControllers.updateReview);
router.delete('/review/delete/:id', ArticleReviewControllers.deleteReview);



//article category routes
 
router.post('/category/create', ArticleCategoryControllers.createCategory);
router.get('/category/index', ArticleCategoryControllers.getAllCategories);
router.get('/category/view/:id', ArticleCategoryControllers.getCategoryById);
router.patch('/category/update/:id', ArticleCategoryControllers.updateCategory);
router.delete('/category/delete/:id', ArticleCategoryControllers.deleteCategory);


module.exports = router;