
// schema from joi - machine
const frisby = require('frisby');
const Joi = frisby.Joi;

const schema = Joi.object().keys({
    data: Joi.object().keys({
        id: Joi.number().integer().required(), 
        email: Joi.string().email().required(), 
        first_name: Joi.string().required(), 
        last_name: Joi.string().required(), 
        avatar: Joi.string().uri().required()
    }).required(), 
    support: Joi.object().keys({
        url: Joi.string().uri().required(), 
        text: Joi.string().required()
    }).required()
});

module.exports = schema;

