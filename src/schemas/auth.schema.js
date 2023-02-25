import joi from "joi";

export const signUpSchema = joi.object({
    name: joi.string().min(1).required(),
    email: joi.string().min(1).email().required(),
    password: joi.string().min(1).required(),
    confirmPassword: joi.string().min(1).required()
})

export const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})