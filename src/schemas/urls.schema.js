import joi from "joi"

export const createShortUrlSchema = joi.object({
    url: joi.string().min(1).uri().required()
})