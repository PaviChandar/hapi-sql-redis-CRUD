import Joi from "joi"

export const userValidationSchema = (input: Object) => {
    const userSchema = Joi.object(
        {
            id: Joi.number()
                .required(),
            name: Joi.string()
                .min(5)
                .required(),
            age: Joi.number()
                .precision(2)
                .required(),
            city: Joi.string()
                .required(),
            salary: Joi.number()
                .required()
        }
    )
    return userSchema.validate(input)
}