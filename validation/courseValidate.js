const courseModel = require("../models/courses/courseModel");
const Joi = require("joi");
const validator = require('validator');



// Validate Create course

function validateCreateCourse(courseModel) {
  const schema = Joi.object({
    title: Joi.string().min(4).max(150).required(),
    slug: Joi.string().lowercase(),
    description: Joi.string().required(),
    instructor: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.number().required(),
    level: Joi.string(),
    language: Joi.string(),
    startDate: Joi.string(),
    duration: Joi.string(),
    certificate: Joi.boolean(),
    introduction: Joi.string(),
    assessment: Joi.string(),
    requirements: Joi.string(),
    materials: Joi.string(),
    publishDate: Joi.string(),
    coverPhoto: Joi.string(),
    units:Joi.string(),
    review:Joi.string(),
  });
  return schema.validate(courseModel);
}
function validateUpdateCourse(courseModel) {
  const schema = Joi.object({
    title: Joi.string().min(4).max(150),
    slug: Joi.string().lowercase(),
    description: Joi.string(),
    instructor: Joi.string(),
    category: Joi.string(),
    price: Joi.number(),
    level: Joi.string(),
    language: Joi.string(),
    startDate: Joi.string(),
    duration: Joi.string(),
    certificate: Joi.boolean(),
    introduction: Joi.string(),
    assessment: Joi.string(),
    requirements: Joi.string(),
    materials: Joi.string(),
    publishDate: Joi.string(),
    coverPhoto: Joi.string(),
    units: Joi.string(),
    review: Joi.string(),
  });
  return schema.validate(courseModel);
}




module.exports = {
  validateCreateCourse,
  validateUpdateCourse,
};
