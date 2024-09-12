const asyncHandler = require("express-async-handler");
const MainInfo = require("../../models/cvs/mainInfo");
const {
  validatecreateMainInfo,
  validateupdateMainInfo,
} = require("../../validation/cv/mainInfoVaildate");

/**-----------------------------------------------
 * @desc    Create New mainInfo
 * @route  /api/cv/mainInfo/create
 * @method  POST
 * @access  public
 ------------------------------------------------*/
module.exports.createMainInfoCtrl = asyncHandler(async (req, res) => {
  const { error } = validatecreateMainInfo(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const mainInfo = await MainInfo.create({
    jobTitle: req.body.jobTitle,
    
  });

  res.status(201).json(mainInfo);
});
/**-----------------------------------------------
 * @desc    get All mainInfo
 * @route  /api/cv/mainInfo/index
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getAllMainInfoCtrl = asyncHandler(async (req, res) => {
  const mainInfo = await MainInfo.find();
  res.status(200).json(mainInfo);
});

/**-----------------------------------------------
 * @desc    Get single mainInfo view
 * @route   /api/cv/mainInfo/view/:id
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getSingleMainInfoCtrl = asyncHandler(async (req, res) => {
  const mainInfo = await MainInfo.findById(req.params.id);
  if (!mainInfo) {
    return res.status(404).json({ message: "mainInfo not found" });
  }
  res.status(200).json(mainInfo);
});

/**-----------------------------------------------
 * @desc    Update mainInfo
 * @route   /api/cv/mainInfo/update/:id
 * @method  PUT
 * @access  public
 ------------------------------------------------*/
module.exports.updateMainInfoCtrl = asyncHandler(async (req, res) => {
  const { error } = validateupdateMainInfo(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const mainInfo = await MainInfo.findById(req.params.id);
  if (!mainInfo) {
    return res.status(404).json({ message: "mainInfo not found" });
  }
  const updateMainInfo = await MainInfo.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        jobTitle: req.body.jobTitle,
      },
    },
    { new: true }
  );

  res.status(200).json(updateMainInfo);
});

/**-----------------------------------------------
 * @desc    Delete mainInfo
 * @route   /api/cv/mainInfo/delete/:id
 * @method  DELETE
 * @access  
 ------------------------------------------------*/
module.exports.deleteMainInfoCtrl = asyncHandler(async (req, res) => {
  const mainInfo = await MainInfo.findById(req.params.id);
  if (!mainInfo) {
    return res.status(404).json({ message: "MainInfo not found" });
  }

  await MainInfo.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: "mainInfo has been deleted successfully",
  });
});
