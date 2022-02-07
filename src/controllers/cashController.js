import db from "../db.js";

import { types } from "../utils/utils.js"

export async function allTransactions(req, res){
    try {
        
        const transactions = await db.collection("transactions").find({}).toArray();

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
         await db.collection("transactions").insertOne(transaction);
    } catch (err) {
        return err
    }
}