import Joi from "joi"

export const employeeValidationSchema = (input: Object) => {
    const employeeSchema = Joi.object(
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
                .required(),
            login: Joi.boolean()
        }
    )
    return employeeSchema.validate(input)
}

export const userValidationSchema = (input: Object) => {
    const userSchema = Joi.object(
        {
            username: Joi.string()
                    .min(5)
                    .required(),
            email: Joi.string()
                    .min(5)
                    .required(),
            password: Joi.string()
                    .min(5)
                    .required(),
        }
    )
    return userSchema.validate(input)
}