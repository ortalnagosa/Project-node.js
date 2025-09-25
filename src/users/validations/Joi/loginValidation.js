const Joi = require("joi");

const loginValidation = (user) => {
    const schema = Joi.object({
        email: Joi.string()
                .ruleset.regex(
                  /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
                )
                .rule({ message: "user email must be valid mail" })
            .required(),
            password: Joi.string()
                .ruleset.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{7,}$/)
                .rule({
                  message:
                    "Password must be at least 7 characters long, include uppercase, lowercase, number and special character",
                })
                    .required(),
    })
       return schema.validate(user);
}

module.exports = loginValidation;
  