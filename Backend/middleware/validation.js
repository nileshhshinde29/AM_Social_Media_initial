const Joi = require("joi");
const JoiComplex = require("joi-password-complexity");

const complexityOptions = {
  min: 6,
  max: 250,
  numric: 1,
  symbol: 1,
  requirmentCount: 2,
};

const userValidation = (data) => {
  const schema = Joi.object({
    firstname: Joi.string().min(4).required(),
    lastname: Joi.string().min(4).required(),
    email: Joi.string().email().min(6).required(),
    password: JoiComplex(complexityOptions),
  });
  return schema.validate(data);
};

module.exports.userValidation = userValidation;
