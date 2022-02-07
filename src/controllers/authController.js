import bcrypt from 'bcrypt';
import db from '../db.js';
import {v4 as uuid} from "uuid";


export async function signUp(req,res){
    const user = req.body;

    try {
        const usersCol = db.collection("users");
        const passwordHash = bcrypt.hashSync(user.password, 10);
        user.password = passwordHash;

        await usersCol.insertOne(user);

        res.sendStatus(201);
        
    } catch (err) {
        console.log(err);
    }
}

export async function signIn(req, res){
    const {email, password} = req.body;

    const user =  await db.collection("users").findOne({ email });

    if(user && bcrypt.compareSync(password, user.password)){
        const token = uuid();

        await db.collection("sessions").insertOne({token, userId: user._id});
        
        delete user.password;
        user.token = token;

        res.send(user);
    } else {
        res.sendStatus(401);
    }
}

export async function signOut(req, res){
    const { _id } = res.locals.user;

    await db.collection('sessions').deleteOne({userId: _id});

    res.sendStatus(200);

}
