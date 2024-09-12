const Experience = require("../../models/cvs/experience");
const Joi = require("joi");

// Validate  Create experience

function validatecreateExperience(Experience) {
  const schema = Joi.object({
    CompanyName: Joi.string()
      .trim()
      .required()
      .min(3)
      .max(50)
      .pattern(new RegExp("^[a-zA-Z0-9\\s]*$")),
    position: Joi.string().required().min(3).max(50),
    timePeriod: Joi.object({
      from: Joi.date().required(),
      to: Joi.date().required(),
    }).custom((value, helpers) => {
      if (value.from >= value.to) {
        return helpers.message("End date must be after the start date.");
      }
      return value;
    }),
    CompanyLogo: Joi.string().default(""),
  });
  return schema.validate(Experience);
}

// Validate update Experience
function validateupdateExperience(Experience) {
  const schema = Joi.object({
    CompanyName: Joi.string()
      .trim()
      .min(3)
      .max(50)
      .pattern(new RegExp("^[a-zA-Z0-9\\s]*$")),
    position: Joi.string().min(3).max(50),
    timePeriod: Joi.object({
      from: Joi.date(),
      to: Joi.date(),
    }).custom((value, helpers) => {
      if (value.from >= value.to) {
        return helpers.message("End date must be after the start date.");
      }
      return value;
    }),
    CompanyLogo: Joi.string().default(""),
  });
  return schema.validate(Experience);
}

module.exports = { validatecreateExperience, validateupdateExperience };
