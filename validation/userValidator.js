const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const currentYear = new Date().getFullYear();
const minYear = currentYear - 60;

const messages = {
  firstName: {
    "string.min": "First name must be at least 3 characters",
    "string.max": "First name must be less than or equal to 50 characters",
    "any.required": "First name is required",
  },
  lastName: {
    "string.min": "Last name must be at least 3 characters",
    "string.max": "Last name must be less than or equal to 50 characters",
    "any.required": "Last name is required",
  },
  userId: {
    "string.pattern.base": "userId must be exactly 10 digits.",
    "any.required": "userId is a required field."
  },
  status: {
    "any.required": "status is required.",
    "any.only": "status must be either 0 or 1."
  },
  graduationYear: {
    "number.base": "Graduate year must be a number.",
    "number.min": `Graduate year cannot be earlier than ${minYear}.`,
    "number.max": `Graduate year cannot exceed the current year (${currentYear}).`,
  },
  role: {
    "any.required": "role is required.",
    "any.only": "role must be from those values [admin, instructor, editor, student]."
  },
  phoneNumber: {
    "string.pattern.base": "Phone number must include a valid country code followed by 10 digits.",
  }
}

// Validate Register User
function validateRegisterUser(obj) {
  const schema = Joi.object({
    firstName: Joi.string()
      .trim()
      .min(3)
      .max(50)
      .pattern(/^[\u0600-\u06FFa-zA-Z\s]+$/)
      .required()
      .messages(messages.firstName),

    lastName: Joi.string()
      .trim()
      .min(3)
      .max(50)
      .pattern(/^[\u0600-\u06FFa-zA-Z\s]+$/)
      .required()
      .messages(messages.lastName),

    email: Joi.string().trim().min(5).max(100).email().required(),

    password: passwordComplexity().required(),
  });
  return schema.validate(obj);
}
// Validate Register User by admin
function validateRegisterUserByAdmin(obj) {
  const schema = Joi.object({
    firstName: Joi.string()
      .trim()
      .min(3)
      .max(50)
      .pattern(/^[\u0600-\u06FFa-zA-Z\s]+$/)
      .required()
      .messages(messages.firstName),

    lastName: Joi.string()
      .trim()
      .min(3)
      .max(50)
      .pattern(/^[\u0600-\u06FFa-zA-Z\s]+$/)
      .required()
      .messages(messages.lastName),

    status: Joi.number().valid(0, 1).required().messages(messages.status),

    email: Joi.string().trim().min(5).max(100).email().required(),

    role: Joi.string().valid("admin", "instructor", "editor", "student").required().messages(messages.role),
    phoneNumber: Joi.string().pattern(/^\+?[0-9]{1,3}[ ]?[0-9]{10}$/)
      .required().messages(messages.phoneNumber),

    userId: Joi.string().pattern(/^\d{10}$/).required().messages(messages.userId),

    password: passwordComplexity().required(),
  });
  return schema.validate(obj);
}

// Validate Login User
function validateLoginUser(obj) {
  const schema = Joi.object({
    userId: Joi.string().pattern(/^\d{10}$/).required(),

    password: Joi.string().trim().min(8).required(),
  });
  return schema.validate(obj);
}

// Validate Update User
function validateUpdateUser(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(50).pattern(/^[\u0600-\u06FFa-zA-Z\s]+$/)
      .optional().messages(messages.firstName),

    lastName: Joi.string().trim().min(3).max(50).pattern(/^[\u0600-\u06FFa-zA-Z\s]+$/)
      .optional().messages(messages.lastName),

    about: Joi.string().trim().min(3).max(500).optional(),
    dateOfBirth: Joi.date()
      .less("now")
      .greater("1924-01-01")
      .custom((value, helpers) => {
        const today = new Date();
        const birthDate = new Date(value);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        if (age < 18) {
          return helpers.message("age must be at least 18 years old");
        }
        return value;
      })
      .required(),

    nationality: Joi.string().trim().min(3).max(50).optional(),
    country: Joi.string().trim().min(3).max(50).optional(),
    city: Joi.string().trim().min(3).max(50).optional(),
    major: Joi.string().trim().min(3).max(50).optional(),

    graduationYear: Joi.number().integer().min(minYear).max(currentYear)
      .optional().messages(messages.currentYear),

    email: Joi.string().trim().min(5).max(100).email().optional(),

    phoneNumber: Joi.string().pattern(/^\+?[0-9]{1,3}[ ]?[0-9]{10}$/)
      .optional().messages(messages.phoneNumber),

    profileImage: Joi.string().optional(),
  });
  return schema.validate(obj);
}


module.exports = {
  validateRegisterUser,
  validateRegisterUserByAdmin,
  validateLoginUser,
  validateUpdateUser,
};
