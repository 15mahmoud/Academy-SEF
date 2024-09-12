const asyncHandler = require("express-async-handler");
const Skill = require("../../models/cvs/skill");
const {
  validatecreateSkill,
  validateupdateSkill,
} = require("../../validation/cv/skillVaildate");

/**-----------------------------------------------
 * @desc    Create New skill
 * @route  /api/cv/skill/create
 * @method  POST
 * @access  public
 ------------------------------------------------*/
module.exports.createSkillCtrl = asyncHandler(async (req, res) => {
  const { error } = validatecreateSkill(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const skill = await Skill.create({
    skillName: req.body.skillName,
    subSkill: req.body.SubSkill,
    skillLevel: req.body.skillLevel,
  });

  res.status(201).json(skill);
});
/**-----------------------------------------------
 * @desc    get All skill
 * @route  /api/cv/skill/index
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getAllSkillCtrl = asyncHandler(async (req, res) => {
  const skill = await Skill.find();
  res.status(200).json(skill);
});

/**-----------------------------------------------
 * @desc    Get single skill view
 * @route   /api/cv/skill/view/:id
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getSingleSkillCtrl = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  if (!skill) {
    return res.status(404).json({ message: "link not found" });
  }
  res.status(200).json(skill);
});

/**-----------------------------------------------
 * @desc    Update skill
 * @route   /api/cv/skill/update/:id
 * @method  PUT
 * @access  public
 ------------------------------------------------*/
module.exports.updateSkillCtrl = asyncHandler(async (req, res) => {
  const { error } = validateupdateSkill(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const skill = await Skill.findById(req.params.id);
  if (!skill) {
    return res.status(404).json({ message: "skill not found" });
  }
  const updateSkill = await Skill.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        skillName: req.body.skillName,
        subSkill: req.body.subSkill,
        skillLevel: req.body.skillLevel,
      },
    },
    { new: true }
  );

  res.status(200).json(updateSkill);
});

/**-----------------------------------------------
 * @desc    Delete skill
 * @route   /api/cv/skill/delete/:id
 * @method  DELETE
 * @access  
 ------------------------------------------------*/
module.exports.deleteSkillCtrl = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  if (!skill) {
    return res.status(404).json({ message: "link not found" });
  }

  await Skill.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: "skill has been deleted successfully",
  });
});
