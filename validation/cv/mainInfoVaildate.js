const MainInfo = require("../../models/cvs/mainInfo");
const Joi = require("joi");

// Validate  Create mainInfo

function validatecreateMainInfo(MainInfo) {
  const schema = Joi.object({
    jobTitle: Joi.string().trim().required(),
    
  });
  return schema.validate(MainInfo);
}

// Validate update MainInfo
function validateupdateMainInfo(MainInfo) {
  const schema = Joi.object({
    jobTitle: Joi.string().trim().required(),
  });
  return schema.validate(MainInfo);
}

module.exports = { validatecreateMainInfo, validateupdateMainInfo };
