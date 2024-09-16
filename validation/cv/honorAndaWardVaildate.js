const HonorAndaWard = require("../../models/cvs/honorAndaWard");
const Joi = require("joi");

// Validate  Create honorAndaWard

function validatecreateHonorAndaWard(HonorAndaWard) {
  const schema = Joi.object({
    awardName: Joi.string().trim().required().max(50),
    year: Joi.number().required().max(new Date().getFullYear()),
    description: Joi.string().trim().required().max(500),
    Issuer: Joi.string().trim(),
  });
  return schema.validate(HonorAndaWard);
}

// Validate update honorAndaWard
function validateupdateHonorAndaWard(HonorAndaWard) {
  const schema = Joi.object({
    awardName: Joi.string().trim().max(50),
    year: Joi.number().max(new Date().getFullYear()),
    description: Joi.string().trim().max(500),
    Issuer: Joi.string().trim(),
  });
  return schema.validate(HonorAndaWard);
}

module.exports = { validatecreateHonorAndaWard, validateupdateHonorAndaWard };
