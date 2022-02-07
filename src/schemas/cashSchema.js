import joi from 'joi'

const cashSchema = joi.object({
    value : joi.number().required().greater(0),
    description : joi.string().required(),
})

export default cashSchema;