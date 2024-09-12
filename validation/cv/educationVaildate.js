const Education = require("../../models/cvs/education");
const Joi = require("joi");

// education Create cv

function validatecreateEducation(Education) {
  const schema = Joi.object({
    organizationName: Joi.string().trim().required().max(100),
    university: Joi.string().trim().required().max(100),
    degree: Joi.string().required().max(50),
    timePeriod: Joi.object({
      from: Joi.date().required(),
      to: Joi.date().required(),
    }),
    description: Joi.string().trim().required().max(500),
  });
  return schema.validate(Education);
}

// Validate update Education
function validateupdateEducation(Education) {
  const schema = Joi.object({
    organizationName: Joi.string().trim().required().max(100),
    university: Joi.string().trim().required().max(100),
    degree: Joi.string().max(50),
    timePeriod: Joi.object({
      from: Joi.date(),
      to: Joi.date(),
    }),
    description: Joi.string().trim().max(500),
  });
  return schema.validate(Education);
}

module.exports = { validatecreateEducation, validateupdateEducation };
