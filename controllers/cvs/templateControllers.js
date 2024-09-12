const asyncHandler = require("express-async-handler");
const Template = require("../../models/cvs/template");
const {
  validatecreateTemplate,
  validateupdateTemplate,
} = require("../../validation/cv/templateVaildate");

/**-----------------------------------------------
 * @desc    Create New template
 * @route  /api/cv/template/create
 * @method  POST
 * @access  public
 ------------------------------------------------*/
module.exports.createTemplateCtrl = asyncHandler(async (req, res) => {
  const { error } = validatecreateSocialLink(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const template = await Template.create({
    name: req.body.name,
    url: req.body.url,
    icon: req.body.status,
  });

  res.status(201).json(template);
});
/**-----------------------------------------------
 * @desc    get All template
 * @route  /api/cv/template/index
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getAllTemplateCtrl = asyncHandler(async (req, res) => {
  const template = await Template.find();
  res.status(200).json(template);
});

/**-----------------------------------------------
 * @desc    Get single template view
 * @route   /api/cv/template/view/:id
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getSingleTemplateCtrl = asyncHandler(async (req, res) => {
  const template = await Template.findById(req.params.id);
  if (!template) {
    return res.status(404).json({ message: "template  not found" });
  }
  res.status(200).json(template);
});

/**-----------------------------------------------
 * @desc    Update template
 * @route   /api/cv/template/update/:id
 * @method  PUT
 * @access  public
 ------------------------------------------------*/
module.exports.updateTemplateCtrl = asyncHandler(async (req, res) => {
  const { error } = validateupdateTemplate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const template = await Template.findById(req.params.id);
  if (!template) {
    return res.status(404).json({ message: "template not found" });
  }
  const updateTemplate = await Template.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        url: req.body.url,
        icon: req.body.status,
      },
    },
    { new: true }
  );

  res.status(200).json(updateTemplate);
});

/**-----------------------------------------------
 * @desc    Delete template
 * @route   /api/cv/template/delete/:id
 * @method  DELETE
 * @access  
 ------------------------------------------------*/
module.exports.deleteTemplateCtrl = asyncHandler(async (req, res) => {
  const template = await Template.findById(req.params.id);
  if (!template) {
    return res.status(404).json({ message: "template not found" });
  }

  await Template.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: "template has been deleted successfully",
  });
});
