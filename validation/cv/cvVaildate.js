const Cv = require("../../models/cvs/cv");
const Joi = require("joi");

// certificate Create cv

function validatecreateCv(Cv) {
  const schema = Joi.object({
    code: Joi.string().min(3).max(50).required(),
    summary: Joi.string().min(3).max(1024).required(),
  });
  return schema.validate(Cv);
}

// Validate update cv
function validateupdateCv(Cv) {
  const schema = Joi.object({
    code: Joi.string().min(3).max(50),
    summary: Joi.string().min(3).max(1024),
  });
  return schema.validate(Cv);
}

module.exports = { validatecreateCv, validateupdateCv };
