const asyncHandler = require("express-async-handler");
const Education = require("../../models/cvs/education");
const {
  validatecreateEducation,
  validateupdateEducation,
} = require("../../validation/cv/educationVaildate");

/**-----------------------------------------------
 * @desc    Create New education
 * @route  /api/cv/education/create
 * @method  POST
 * @access  public
 ------------------------------------------------*/
module.exports.createEducationCtrl = asyncHandler(async (req, res) => {
  const { error } = validatecreateEducation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const education = await Education.create({
    organizationName: req.body.organizationName,
    university: req.body.university,
    degree: req.body.degree,
    timePeriod: {
      from: req.body.timePeriod.from,
      to: req.body.timePeriod.to,
    },
    description: req.body.description,
  });

  res.status(201).json(education);
});
/**-----------------------------------------------
 * @desc    get All education
 * @route  /api/cv/education/index
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getAllEducationCtrl = asyncHandler(async (req, res) => {
  const education = await Education.find();
  res.status(200).json(education);
});

/**-----------------------------------------------
 * @desc    Get single education view
 * @route   /api/cv/education/view/:id
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getSingleEducationCtrl = asyncHandler(async (req, res) => {
  const education = await Education.findById(req.params.id);
  if (!education) {
    return res.status(404).json({ message: "education not found" });
  }
  res.status(200).json(education);
});

/**-----------------------------------------------
 * @desc    Update education
 * @route   /api/cv/education/update/:id
 * @method  PUT
 * @access  public
 ------------------------------------------------*/
module.exports.updateEducationCtrl = asyncHandler(async (req, res) => {
  const { error } = validateupdateEducation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const education = await Education.findById(req.params.id);
  if (!education) {
    return res.status(404).json({ message: "education not found" });
  }
  const updateEducation = await Education.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        organizationName: req.body.organizationName,
        university: req.body.university,
        degree: req.body.degree,
        timePeriod: {
          from: req.body.timePeriod.from,
          to: req.body.timePeriod.to,
        },
        description: req.body.description,
      },
    },
    { new: true }
  );

  res.status(200).json(updateEducation);
});

/**-----------------------------------------------
 * @desc    Delete education
 * @route   /api/cv/education/delete/:id
 * @method  DELETE
 * @access  
 ------------------------------------------------*/
module.exports.deleteEducationCtrl = asyncHandler(async (req, res) => {
  const education = await Education.findById(req.params.id);
  if (!education) {
    return res.status(404).json({ message: "education not found" });
  }

  await Education.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: "education has been deleted successfully",
  });
});
