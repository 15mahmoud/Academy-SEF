const asyncHandler = require("express-async-handler");
const project = require("../../models/cvs/project");
const {
  validatecreateProject,
  validateupdateLanguage,
} = require("../../validation/cv/projectVaildate");

/**-----------------------------------------------
 * @desc    Create New project
 * @route  /api/cv/project/create
 * @method  POST
 * @access  public
 ------------------------------------------------*/
module.exports.createProjectCtrl = asyncHandler(async (req, res) => {
  const { error } = validatecreateProject(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const project = await Project.create({
    ProjectName: req.body.ProjectName,
    Description: req.body.Description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  });

  res.status(201).json(project);
});
/**-----------------------------------------------
 * @desc    get All project
 * @route  /api/cv/project/index
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getAllProjectCtrl = asyncHandler(async (req, res) => {
  const project = await Project.find();
  res.status(200).json(project);
});

/**-----------------------------------------------
 * @desc    Get single project view
 * @route   /api/cv/project/view/:id
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getSingleLanguageCtrl = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    return res.status(404).json({ message: "project not found" });
  }
  res.status(200).json(project);
});

/**-----------------------------------------------
 * @desc    Update project
 * @route   /api/cv/project/update/:id
 * @method  PUT
 * @access  public
 ------------------------------------------------*/
module.exports.updateProjectCtrl = asyncHandler(async (req, res) => {
  const { error } = validateupdateLanguage(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const project = await project.findById(req.params.id);
  if (!project) {
    return res.status(404).json({ message: "project not found" });
  }
  const updateProject = await Project.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        ProjectName: req.body.ProjectName,
        Description: req.body.Description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
      },
    },
    { new: true }
  );

  res.status(200).json(updateProject);
});

/**-----------------------------------------------
 * @desc    Delete project
 * @route   /api/cv/project/delete/:id
 * @method  DELETE
 * @access  
 ------------------------------------------------*/
module.exports.deleteProjectCtrl = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    return res.status(404).json({ message: "project not found" });
  }

  await Project.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: "project has been deleted successfully",
  });
});
