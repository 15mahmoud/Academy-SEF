const socialLink = require("../../models/cvs/socialLink");
const Joi = require("joi");

// Validate  Create socialLink

function validatecreateSocialLink(socialLink) {
  const schema = Joi.object({
    name: Joi.string().trim().required().min(3).max(50),
    link: Joi.string().trim().required(),
    
  });
  return schema.validate(socialLink);
}

// Validate update socialLink
function validateupdateSocialLink(socialLink) {
  const schema = Joi.object({
    name: Joi.string().trim().required().min(3).max(50),
    link: Joi.string().trim().required(),
  });
  return schema.validate(socialLink);
}

module.exports = { validatecreateSocialLink, validateupdateSocialLink };
