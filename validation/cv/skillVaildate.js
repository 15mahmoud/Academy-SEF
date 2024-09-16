const Skill = require("../../models/cvs/skill");
const Joi = require("joi");

// Validate  Create skill

function validatecreateSkill(Skill) {
  const schema = Joi.object({
    skillName: Joi.string().trim().required().min(3).max(50),
    subSkill: Joi.string().trim().max(50),
    skillLevel: Joi.string().trim().max(20),
  });
  return schema.validate(Skill);
}

// Validate update skill
function validateupdateSkill(Skill) {
  const schema = Joi.object({
    skillName: Joi.string().trim().min(3).max(50),
    SubSkill: Joi.string().trim().max(50),
    skillLevel: Joi.string().trim().max(20),
  });
  return schema.validate(Skill);
}

module.exports = { validatecreateSkill, validateupdateSkill };
