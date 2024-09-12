const asyncHandler = require("express-async-handler");
const Experience = require("../../models/cvs/experience");
const {
  validatecreateExperience,
  validateupdateExperience,
} = require("../../validation/cv/experienceVaildate");

/**-----------------------------------------------
 * @desc    Create New experience
 * @route  /api/cv/experience/create
 * @method  POST
 * @access  public
 ------------------------------------------------*/
module.exports.createExperienceCtrl = asyncHandler(async (req, res) => {
  const { error } = validatecreateExperience(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const experience = await Experience.create({
    CompanyName: req.body.CompanyName,
    position: req.body.position,
    timePeriod: {
      from: req.body.timePeriod.from,
      to: req.body.timePeriod.to,
    },
    CompanyLogo: req.body.CompanyLogo,
  });

  res.status(201).json(experience);
});
/**-----------------------------------------------
 * @desc    get All experience
 * @route  /api/cv/experience/index
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getAllExperienceCtrl = asyncHandler(async (req, res) => {
  const experience = await Experience.find();
  res.status(200).json(experience);
});

/**-----------------------------------------------
 * @desc    Get single experience view
 * @route   /api/cv/experience/view/:id
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getSingleExperienceCtrl = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id);
  if (!experience) {
    return res.status(404).json({ message: "experience not found" });
  }
  res.status(200).json(experience);
});

/**-----------------------------------------------
 * @desc    Update experience
 * @route   /api/cv/experience/update/:id
 * @method  PUT
 * @access  public
 ------------------------------------------------*/
module.exports.updateExperienceCtrl = asyncHandler(async (req, res) => {
  const { error } = validateupdateExperience(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const experience = await Experience.findById(req.params.id);
  if (!experience) {
    return res.status(404).json({ message: "experience not found" });
  }
  const updateExperience = await Experience.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        CompanyName: req.body.CompanyName,
        position: req.body.position,
        timePeriod: {
          from: req.body.timePeriod.from,
          to: req.body.timePeriod.to,
        },
        CompanyLogo: req.body.CompanyLogo,
      },
    },
    { new: true }
  );

  res.status(200).json(updateExperience);
});

/**-----------------------------------------------
 * @desc    Delete experience
 * @route   /api/cv/experience/delete/:id
 * @method  DELETE
 * @access  
 ------------------------------------------------*/
module.exports.deleteExperienceCtrl = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id);
  if (!experience) {
    return res.status(404).json({ message: "experience not found" });
  }

  await Experience.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: "experience has been deleted successfully",
  });
});
