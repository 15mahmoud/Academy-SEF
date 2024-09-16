const Language = require("../../models/cvs/language");
const Joi = require("joi");

// Validate  Create language

function validatecreateLanguage(Language) {
  const schema = Joi.object({
    LanguageName: Joi.string().trim().required().min(2).max(50),
    ProficiencyLevel: Joi.string().trim().required().min(2).max(30),
  });
  return schema.validate(Language);
}

// Validate update language
function validateupdateLanguage(Language) {
  const schema = Joi.object({
    LanguageName: Joi.string().trim().min(2).max(50),
    ProficiencyLevel: Joi.string().trim().min(2).max(30),
  });
  return schema.validate(Language);
}

module.exports = { validatecreateLanguage, validateupdateLanguage };
