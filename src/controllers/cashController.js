import { ObjectId } from "mongodb";
import db from "../db.js";

import { types } from "../utils/utils.js"

const cashCollection = db.collection("transactions");

export async function allTransactions(req, res){
    try {
        
        const transactions = await cashCollection.find({}).toArray();

        res.send(transactions);

    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function newIncome(req, res){
    const newIncome = req.body;
    newIncome.type = types.in;

    try {
        await newTransaction(newIncome);

        res.sendStatus(201);

    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}
export async function newOutcome(req, res){
    const newIncome = req.body;
    newIncome.type = types.out;
    newIncome.date = Date.now();

    try {
        await newTransaction(newIncome);

        res.sendStatus(201);

    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}


async function newTransaction(transaction){
    try {
         await cashCollection.insertOne(transaction);
    } catch (err) {
        return err
    }
}

export async function deleteTransaction(req, res){
        let {id: _id} = req.params;
        _id = new ObjectId(_id);
    try {
        const constult = await  cashCollection.findOne({_id});
        if(!constult)
            return res.sendStatus(404)

        await cashCollection.deleteOne({_id});

        res.sendStatus(204);
    } catch (err) {
        return res.status(500).send(err);
    }
}