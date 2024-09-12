const connction = require("../../models/cvs/connction");
const Joi = require("joi");

// Validate  Create connction

function validatecreateConnction(connction) {
  const schema = Joi.object({
    websiteName: Joi.string().trim().min(3).max(50),
    phoneNumer: Joi.string(),
    landlinePhone: Joi.string(),
    email: Joi.string().trim(), 
    whatsapp: Joi.string().trim(),
    linkedin: Joi.string().trim(),
    
  });
  return schema.validate(connction);
}

// Validate update connction
function validateupdateConnction(connction) {
  const schema = Joi.object({
    websiteName: Joi.string().trim().required().min(3).max(50),
    phoneNumer: Joi.number().trim(),
    landlinePhone: Joi.number().trim(),
    email: Joi.string().trim().required(), 
    whatsapp: Joi.string().trim().required(),
    linkedin: Joi.string().trim(),
  });
  return schema.validate(connction);
}

module.exports = { validatecreateConnction, validateupdateConnction };
