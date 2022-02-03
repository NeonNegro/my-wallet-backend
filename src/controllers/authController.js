import bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid';
import db from '../db.js';
import { userSchema } from '../schemas/schemas.js';


export async function signUp(req,res){
    const user = req.body;

    user.name = stripHtml(participant.name).result.trim();
    const validation = userSchema.validate(user);

    if(validation.error){
        res.senStatus(422);
        return
    }

    try {
        const usersCol = db.collection("users");
        
        const consult = usersCol.findOne({email: email});
        if (consult){
            res.sendStatus(409);
            return
        }
        
        const passwordHash = bcrypt.hashSync(user.password, 10);
        user.password = passwordHash;

        await usersCol.insertOne(user);

        res.sendStatus(201);
        
    } catch (err) {
        console.log(err);
    }
}