const express = require("express");
const { userAuth } = require("../middleware/userAuth");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const router = express.Router();

router.use(userAuth);
router.get("/balance",async (req, res)=>{
    const token = req.headers.authorization.trim().split(" ")[1];
    const username = jwt.decode(token).username;
    console.log(token);
    try{        
        const user = await User.findOne({username:username});
        const id = user["_doc"]["_id"];
        const accountBalance = await Account.findOne({userId:id});
        if(!accountBalance){
            throw new Error("No account found with the given user ID");
        }

        const recBalance = accountBalance["_doc"].balance;
        res.status(200).json({
            balance:recBalance
        });
    }catch(err){
        res.status(504).json({
            msg:"Not able to fetch balance right now !!!",
            err:err.message
        })
    }

});

router.post("/transfer",async (req, res)=>{
    //Retreiving user info from request jwt
    const token = req.headers.authorization.trim().split(" ")[1];
    const username = jwt.decode(token).username;
    //Start the transaction
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        //Get to and amount from request body
        const to = req.body.to;
        const amount = req.body.amount;
        //Search for the user and the user to which the amount has to be transferred in DB
        const user1 = await User.findOne({username:username});        
        const user2 = await User.findOne({username:to});        
        console.log("Inside Transfer ------------------------------");
        console.log(`user1:`);
        console.log(user1);
        console.log(`user2:`);
        console.log(user2);
        console.log("Inside Transfer ------------------------------")
        //Check both the users exists in DB
        if(user1 != null && user2 != null){
            console.log("Inside user accounts check")
            const userFrom = user1["_doc"]["_id"];
            const userTo = user2["_doc"]["_id"];
            //Get the user account from which the transaction has to occur
            const userFromAccount = await Account.findOne({userId:userFrom});
            //Checking the user's balance
            if(userFromAccount["_doc"].balance >= parseInt(amount)){
                //Initate transaction
                await Account.updateOne({userId:userFrom},{$inc:{balance:parseInt(-amount)}}).session(session);
                await Account.updateOne({userId:userTo},{$inc:{balance:parseInt(amount)}}).session(session);
            }else{
                //Abort transaction if balance is low
                await session.abortTransaction();
                throw new Error("Low balance!!");
            }
            await session.commitTransaction();
            //Getting user balance from DB
            const userAfterTransfer = await Account.findOne({userId:userFrom});
            res.status(200).json({
                msg:`Successfully transferred Rs ${amount} to account: ${user2["_doc"]["username"]}`,
                "balance remaining":userAfterTransfer ? userAfterTransfer["_doc"]["balance"] : "Not able to fetch balance"
            })
        }else{
            //Abort transaction if user not found
            await session.abortTransaction();
            res.status(411).json({
                msg:`Not able to transfer amount from ${username} to ${to}`,
                why:"Invalid account ID"
            })
        }
    }catch(err){
        res.status(503).json({
            msg:"Something went wrong while transferring money",
            err:err.message
        })
    }

})

module.exports = {
    accountsRouter:router
}