const asyncHandler = require("express-async-handler");
const reviewModel = require("../../models/courses/reviewModel");
const ApiError = require('../../validation/apiError');
const courseModel = require("../../models/courses/courseModel");



//@dec create review
//@route POST /api/reviews
//@access private
exports.createReview = asyncHandler(async (req, res) => {
  const { course_Id, user_Id, rating,comment } = req.query;
  if (!course_Id || !user_Id || !rating || !comment) {
    return res.status(400).json({
      error: "Please provide course_Id ,rating ,comment and user_Id ",
    });
  }
  const courseReview = {
    course_Id,
    user_Id,
    rating,
    comment,
  };
  res.status(200).json({ data: courseReview });
});

//@dec save review
//@route POST /api/reviews
//@access private
exports.saveReview = asyncHandler(async (req, res) => {
  const review = await reviewModel.create(req.body);
  res.status(201).json({ data: review }).redirect('/api/courses/review/index');
});
    

//@dec update review
//@route PUT /api/reviews
//@access private
exports.updateReview = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const review = await reviewModel.findOneAndUpdate(
    { _id: id },
    req.body,
    { new: true }
  );
  if (!review) {
    return next(new ApiError(`No review for this id ${id}`, 404));
  }
  res.status(200).json({ data: review });
});


//@dec delete review
//@route delete /api/reviews
//@access private
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const review = await reviewModel.findByIdAndDelete(id);
  if (!review) {
    return next(new ApiError(`No review for this id ${id}`, 404));
  }
  res.status(204).send();
});





