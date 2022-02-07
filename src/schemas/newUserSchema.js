import joi from 'joi';


const newUserSchema = joi.object({
    name: joi.string().required().pattern(/^([^0-9]*)$/),
    email: joi.string().email().required(),
    password: joi.string().required(),
})

export{
    newUserSchema,
}