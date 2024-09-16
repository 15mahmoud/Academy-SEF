const Joi = require("joi");
const { messages } = require("../validation/userValidator")

function validateNewMessenger(obj) {
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(50).pattern(/^[\u0600-\u06FFa-zA-Z\s]+$/).required().messages(messages.firstName),
        lastName: Joi.string().trim().min(3).max(50).pattern(/^[\u0600-\u06FFa-zA-Z\s]+$/).required().messages(messages.lastName),
        email: Joi.string().email().required(),
        phoneNumber: Joi.string().pattern(/^\+?[0-9]{1,3}[ ]?[0-9]{10}$/).required().messages(messages.phoneNumber),
        message: Joi.string().min(10).max(500).required(),
    });
    return schema.validate(obj);
}


module.exports = {
    validateNewMessenger
};