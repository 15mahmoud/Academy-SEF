const asyncHandler = require("express-async-handler");
const courseStudentModel = require("../../models/courses/courseStudentModel");
const ApiError = require('../../validation/apiError');


//@dec create courseStudent
//@route POST /api/courseStudents
//@access private
exports.createCourseStudent = asyncHandler(async (req, res) => {
  const { course_Id, user_Id, progress } = req.query;
  if (!course_Id || !user_Id || !progress) {
    return res.status(400).json({
      error: "Please provide course_Id ,progress and user_Id ",
    });
  }
  const courseStudent = {
    course_Id,
    user_Id,
    progress,
  };
  res.status(200).json({ data: courseStudent });
});


//@dec save courseStudent
//@route POST /api/courseStudents
//@access private
exports.saveCourseStudent = asyncHandler(async (req, res) => {
  const courseStudent = await courseStudentModel.create(req.body);
  res.status(201).json({ data: courseStudent })
    .redirect('/api/courses/courseStudent/index');
});

// @dec get list of Students
// @route GET /api/courseStudents
// @access public
exports.getStudents = asyncHandler(async (req, res) => {
    const courseStudents = await courseStudentModel.find({})
    res.status(200).json({  data: courseStudents })
});
//////////////////////////////////////////

// @dec get list of courseStudents
// @route GET /api/courseStudents
// @access public
exports.getCourseStudents = asyncHandler(async (req, res) => {
  const { course_Id } = req.params;
  const courseStudents = await courseStudentModel
    .find({ course_Id });

  if (!courseStudents || courseStudents.length === 0) {
    return res.status(404).json({
      error: `No students found for course with ID: ${course_Id}`,
    });
  }
  res.status(200).json({ data: courseStudents });
});


//@dec get specific courseStudent by id
//@route GET /api/courseStudents
//@access public
exports.getCourseStudent = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const courseStudent = await courseStudentModel.findById(id);
  if (!courseStudent) {
    return next(new ApiError(`No courseStudent for this id ${id}`, 404));
  }
  res.status(200).json({ data: courseStudent });
});


//@dec update courseStudent
//@route PUT /api/courseStudents
//@access private
exports.updateCourseStudent = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const courseStudent = await courseStudentModel.findOneAndUpdate(
    { _id: id },
    req.body,
    { new: true }
  );
  if (!courseStudent) {
    return next(new ApiError(`No courseStudent for this id ${id}`, 404));
  }
  res.status(200).json({ data: courseStudent });
});


//@dec delete courseStudent
//@route delete /api/courseStudents
//@access private
exports.deleteCourseStudent = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const courseStudent = await courseStudentModel.findByIdAndDelete(id);
  if (!courseStudent) {
    return next(new ApiError(`No courseStudent for this id ${id}`, 404));
  }
  res.status(204).send();
});