const Certificate = require("../../models/cvs/certificate");
const Joi = require("joi");

// certificate Create about

function validatecreateCertificate(Certificate) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    IssuingOrganization: Joi.string().min(3).max(100).required(),
    IssueDate: Joi.date().required(),
  });
  return schema.validate(Certificate);
}

// Validate update Certificate
function validateupdateCertificate(Certificate) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100),
    IssuingOrganization: Joi.string().min(3).max(100),
    IssueDate: Joi.date().required(),
  });
  return schema.validate(Certificate);
}

module.exports = { validatecreateCertificate, validateupdateCertificate };
