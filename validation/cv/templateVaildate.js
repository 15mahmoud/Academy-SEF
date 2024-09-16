const Template = require("../../models/cvs/template");
const Joi = require("joi");

// Validate  Create template

function validatecreateTemplate(Template) {
  const schema = Joi.object({
    name: Joi.string().trim().required().max(50).min(10),
    url: Joi.string().trim().required(),
    status: Joi.string().trim(),
  });
  return schema.validate(Template);
}

// Validate update template
function validateupdateTemplate(Template) {
  const schema = Joi.object({
    name: Joi.string().trim().max(50).min(10),
    url: Joi.string().trim(),
    status: Joi.string().trim(),
  });
  return schema.validate(Template);
}

module.exports = { validatecreateTemplate, validateupdateTemplate };
