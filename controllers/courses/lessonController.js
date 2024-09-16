const asyncHandler = require("express-async-handler");
const lessonModel = require("../../models/courses/lessonModel");
const ApiError = require('../../validation/apiError');
const unitModel = require("../../models/courses/unitModel");



//@dec create lesson
//@route POST /api/lessons
//@access private
exports.createLesson = asyncHandler(async (req, res) => {
    const { title, description, completed,url,unit_Id } = req.query; 
  if (!title || !description ||!completed||url|| !unit_Id) {
    return res.status(400).json({
      error: "Please provide title, description, url and unit_Id",
    });
  }
  const lesson = {
    title,
    description,
    completed,
    url,
    unit_Id,
  };
  res.status(200).json({ data: lesson });
});


//@dec create lesson
//@route POST /api/lessons
//@access private
exports.saveLesson = asyncHandler(async (req, res) => {
  const lesson = await lessonModel.create(req.body);
  res
    .status(201)
    .json({ data: lesson })
    .redirect("/api/courses/lesson/index");
});
    

//@dec get list of lessons
//@route GET /api/lessons
//@access public
exports.getLessons = asyncHandler(async (req, res) => {
    const lessons = await lessonModel.find({})
    res.status(200).json({  data: lessons })
});


//@dec get specific lesson by id
//@route GET /api/lessons
//@access public
exports.getLesson = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const lesson = await lessonModel
    .findById(id)
    .populate({ path: "unit_Id", select: "unitName -_id" });
  if (!lesson) {
    return next(new ApiError(`No lesson for this id ${id}`, 404));
  }
  res.status(200).json({ data: lesson });
});



//@dec update lesson
//@route PUT /api/lessons
//@access private
exports.updateLesson = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const lesson = await lessonModel.findOneAndUpdate(
    { _id: id },
    req.body,
    { new: true }
  );
  if (!lesson) {
    return next(new ApiError(`No lesson for this id ${id}`, 404));
  }
  res.status(200).json({ data: lesson });
});


//@dec delete lesson
//@route delete /api/lessons
//@access private
exports.deleteLesson = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const lesson = await lessonModel.findByIdAndDelete(id);
  if (!lesson) {
    return next(new ApiError(`No lesson for this id ${id}`, 404));
  }
  res.status(204).send();
});