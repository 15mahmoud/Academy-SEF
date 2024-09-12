const asyncHandler = require("express-async-handler");
const Cv = require("../../models/cvs/cv");
const {
  validatecreateCv,
  validateupdateCv,
} = require("../../validation/cv/cvVaildate");

/**-----------------------------------------------
 * @desc    Create New cv
 * @route  /api/cv/create
 * @method  POST
 * @access  public
 ------------------------------------------------*/

module.exports.createCvCtrl = asyncHandler(async (req, res) => {
  const { error } = validatecreateCv(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const cv = await Cv.create({
    code: req.body.code,
    summary: req.body.summary,
  });
  res.status(201).json(cv);
});

/**-----------------------------------------------
 * @desc    get All cv
 * @route  /api/cv/index
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getAllCvCtrl = asyncHandler(async (req, res) => {
  const cv = await Cv.find();
  res.status(200).json(cv);
});

/**-----------------------------------------------
 * @desc    Get single cv view
 * @route   /api/cv/view/:id
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getSingleCvCtrl = asyncHandler(async (req, res) => {
  const cv = await Cv.findById(req.params.id);
  if (!cv) {
    return res.status(404).json({ message: "cv not found" });
  }
  res.status(200).json(cv);
});

/**-----------------------------------------------
 * @desc    Update cv
 * @route   /api/cv/update/:id
 * @method  PUT
 * @access  public
 ------------------------------------------------*/
module.exports.updateCvCtrl = asyncHandler(async (req, res) => {
  const { error } = validateupdateCv(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const cv = await Cv.findById(req.params.id);
  if (!cv) {
    return res.status(404).json({ message: "cv not found" });
  }
  const updateCv = await Cv.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        code: req.body.code,
        summary: req.body.summary,
      },
    },
    { new: true }
  );

  res.status(200).json(updateCv);
});

/**-----------------------------------------------
 * @desc    Delete cv
 * @route   /api/cv/delete/:id
 * @method  DELETE
 * @access  
 ------------------------------------------------*/
module.exports.deleteCvCtrl = asyncHandler(async (req, res) => {
  const cv = await Cv.findById(req.params.id);
  if (!cv) {
    return res.status(404).json({ message: "cv not found" });
  }

  await Cv.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: "cv has been deleted successfully",
  });
});
