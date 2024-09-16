const asyncHandler = require("express-async-handler");
const unitModel = require("../../models/courses/unitModel");
const ApiError = require('../../validation/apiError');

//@dec create unit
//@route POST /api/units
//@access private
exports.createUnit = asyncHandler(async (req, res) => {
  const { unitName, lessons, course_Id } = req.query;
  if (!title || !content || !unit_Id) {
    return res.status(400).json({
      error: "Please provide unitName, lessons and course_Id",
    });
  }
  const unit = {
    unitName,
    lessons,
    course_Id,
  };
  res.status(200).json({ data: unit });
});


//@dec save unit
//@route POST /api/units
//@access private
exports.saveUnit = asyncHandler(async (req, res) => {
  const unit = await unitModel.create(req.body);
  res.status(201).json({ data: unit }).redirect("/api/courses/unit/index");
});
    

//@dec get list of units
//@route GET /api/units
//@access public
exports.getUnits = asyncHandler(async (req, res) => {
    const units = await unitModel.find({})
    res.status(200).json({  data: units })
});


//@dec get specific unit by id
//@route GET /api/units
//@access public
exports.getUnit = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const unit = await unitModel
    .findById(id)
    .populate({ path: "course_Id", select: "title -_id" });
  if (!unit) {
    return next(new ApiError(`No unit for this id ${id}`, 404));
  }
  res.status(200).json({ data: unit });
});

//  // @desc    Get unit index
//  // @route   GET /api/units/index
//  // @access  private
// exports.getunitIndex = asyncHandler(async (req, res) => {
//   const unit = await unitModel.countDocuments();
//   res.status(200).json(unit);
// });





//@dec update unit
//@route PUT /api/units
//@access private
exports.updateUnit = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const unit = await unitModel.findOneAndUpdate(
    { _id: id },
    req.body,
    { new: true }
  );
  if (!unit) {
    return next(new ApiError(`No unit for this id ${id}`, 404));
  }
  res.status(200).json({ data: unit });
});


//@dec delete unit
//@route delete /api/units
//@access private
exports.deleteUnit = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const unit = await unitModel.findByIdAndDelete(id);
  if (!unit) {
    return next(new ApiError(`No unit for this id ${id}`, 404));
  }
  res.status(204).send();
});