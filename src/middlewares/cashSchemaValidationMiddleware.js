import db from "../db.js";
import cashSchema from "../schemas/cashSchema.js";


export default async function cashSchemaValidationMiddleware(req,res,next){
    const transaction = req.body;
    const validation = cashSchema.validate(transaction);
    if(validation.error){
        return res.sendStatus(422);
    }


    try {
        const consult = await db.collection("transactions").findOne({description: transaction.description });
        if(consult){
            return res.status(409).send("Transação já existe");
        }

    } catch(err){
        return res.sendStatus(500);
        console.log(err);
    }

    next();
}