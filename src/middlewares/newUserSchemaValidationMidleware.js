import db from "../db.js";
import { newUserSchema } from "../schemas/newUserSchema.js";
import { stripHtml } from 'string-strip-html';
//import {v4 as uuid} from 'uuid';

export default async function newUserSchameValidationMiddleware(req, res, next){
    const user = req.body;

    user.name = stripHtml(user.name).result.trim();
    const validation = newUserSchema.validate(user);

    if(validation.error)
        return res.sendStatus(422);

    const usersCol = db.collection("users");
    const consult = await usersCol.findOne({email: user.email});
    if (consult)
        return res.sendStatus(409);

    next();
}