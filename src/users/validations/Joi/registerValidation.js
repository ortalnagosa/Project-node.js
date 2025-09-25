const Joi = require("joi");

const registerValidation = (user) => {
  const urlRegex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

  const schema = Joi.object({
      name: Joi.object()
        .keys({
          first: Joi.string().min(2).max(256).required(),
          middle: Joi.string().min(2).max(256).allow(""),
          last: Joi.string().min(2).max(256).required(),
        })
        .required(),
      isBusiness: Joi.boolean().required(),
      phone: Joi.string()
        .ruleset.regex(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
        .rule({ message: "user phone must be valid Israeli phone number" })
        .required(),
      email: Joi.string()
        .ruleset.regex(
          /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
        )
        .rule({ message: "user email must be valid mail" })
        .required(),
      password: Joi.string()
        .ruleset.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{9,}$/)
        .rule({
          message:
            "Password must be at least 9 characters long, include uppercase, lowercase, number and special character",
        })
        .required(),
      image: Joi.object()
        .keys({
          url: Joi.string()
            .ruleset.regex(urlRegex)
            .rule({ message: "image card url address must be valid url" })
            .allow(""),
          alt: Joi.string().min(2).max(256).allow(""),
        })
        .required(),
      address: Joi.object()
        .keys({
          state: Joi.string().min(2).max(256).allow(""),
          country: Joi.string().min(2).max(256).required(),
          city: Joi.string().min(2).max(256).required(),
          street: Joi.string().min(2).max(256).required(),
          houseNumber: Joi.number().greater(0).required(),
          zip: Joi.number().min(1000).allow(0),
        })
        .required(),
      isAdmin: Joi.boolean().allow(""),
    });
      return schema.validate(user);
}

module.exports = registerValidation;
