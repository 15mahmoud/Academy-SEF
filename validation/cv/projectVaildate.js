const Project = require("../../models/cvs/project");
const Joi = require("joi");

// Validate  Create project

function validatecreateProject(Project) {
  const schema = Joi.object({
    ProjectName: Joi.string().trim().required().min(5).max(100),
    Description: Joi.string().trim().required().min(10).max(500),
    startDate: Joi.date().required(),
    endDate: Joi.date().min(Joi.ref("startDate")).when("startDate", {
      is: Joi.exist(),
      then: Joi.date().required(),
    }),
  });
  return schema.validate(Project);
}

// Validate update project
function validateupdateProject(Project) {
  const schema = Joi.object({
    ProjectName: Joi.string().trim().min(5).max(100),
    Description: Joi.string().trim().min(10).max(500),
    startDate: Joi.date().required(),
    endDate: Joi.date().min(Joi.ref("startDate")).when("startDate", {
      is: Joi.exist(),
      then: Joi.date(),
    }),
  });
  return schema.validate(Project);
}

module.exports = { validatecreateProject, validateupdateProject };
