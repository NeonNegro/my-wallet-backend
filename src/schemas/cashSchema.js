import joi from 'joi'

const cashSchema = joi.object({
    value : joi.number().required(),
    description : joi.string().required(),
})

export default cashSchema;