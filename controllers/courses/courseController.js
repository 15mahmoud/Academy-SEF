const asyncHandler = require("express-async-handler");
const courseModel = require("../../models/courses/courseModel");
const unitModel = require("../../models/courses/unitModel");
const lessonModel = require("../../models/courses/unitModel");
const examModel = require("../../models/courses/unitModel");

const courseCategories = ['Development', 'UI/UX Design'];
const levels = ['LEV.1', 'LEV.2', 'LEV.3'];

const {
  validateCreateCourse,
  validateUpdateCourse,
} = require("../../validation/courseValidate");
const slugify = require('slugify')
const ApiError = require('../../validation/apiError');

//@dec create course
//@route POST /api/courses
//@access private
exports.createCourse = asyncHandler(async (req, res) => {
  const { error } = validateCreateCourse(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const data = { courseCategories, levels };
  res.status(201).json({ data });
});


//@dec save course
//@route POST /api/courses
//@access private
exports.saveCourse = asyncHandler(async (req, res) => {
  const { error } = validateCreateCourse(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.body.status = "enroll"
  req.body.slug = slugify(req.body.title);
  const course = await courseModel.create(req.body);
  res
    .status(201)
    .json({ data: course })
    .redirect("/api/courses/index");
});


//@dec get list of courses
//@route GET /api/courses
//@access public
exports.getCourses = asyncHandler(async (req, res) => {
  const courses = await courseModel.find({});
  res.status(200).json({ data: courses })
});


//@dec get specific course by id
//@route GET /api/courses
//@access public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const course = await courseModel.findById(id)
    .populate({
      path: "units",
      populate: {
        path: "lessons",
        model: "Lesson",
      },
    }).populate({
      path: "review"
    });
  if (!course) {
    return next(new ApiError(`No course found for this id ${id}`, 404));
  }
  res.status(200).json({ data: course });
});


// @desc    Get course count
// @route   GET /api/courses/count
// @access  private
exports.getCourseCount = asyncHandler(async (req, res) => {
  const course = await courseModel.countDocuments();
  res.status(200).json(course);
});




//@dec update course
//@route PUT /api/courses
//@access private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  const { error } = validateUpdateCourse(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { id } = req.params;
  const course = await courseModel
    .findOneAndUpdate({ _id: id }, req.body, { new: true });
  if (!course) {
    return next(new ApiError(`No course for this id ${id}`, 404));
  }
  res.status(200).json({ data: course });
});


//@dec delete course
//@route delete /api/courses
//@access private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const course = await courseModel.findByIdAndDelete(id);
  if (!course) {
    return next(new ApiError(`No course for this id ${id}`, 404));
  }
  res.status(204).send();
});








