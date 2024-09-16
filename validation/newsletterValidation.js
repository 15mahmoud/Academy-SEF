const Joi = require("joi");

function validateNewSubscriber(obj) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
    });
    return schema.validate(obj);
}


module.exports = {
    validateNewSubscriber
};