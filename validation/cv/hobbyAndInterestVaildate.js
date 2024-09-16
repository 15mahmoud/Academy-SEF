const HobbyAndInterest = require("../../models/cvs/hobbyAndInterest");
const Joi = require("joi");

// Validate  Create hobbyAndInterest

function validatecreateHobbyAndInterest(HobbyAndInterest) {
  const schema = Joi.object({
    hobbiesName: Joi.string().trim().required().max(50),
    description: Joi.string().trim().max(500),
  });
  return schema.validate(HobbyAndInterest);
}

// Validate update hobbyAndInterest
function validateupdateHobbyAndInterest(HobbyAndInterest) {
  const schema = Joi.object({
    hobbiesName: Joi.string().trim().max(50),
    description: Joi.string().trim().max(500),
  });
  return schema.validate(HobbyAndInterest);
}

module.exports = {
  validatecreateHobbyAndInterest,
  validateupdateHobbyAndInterest,
};
