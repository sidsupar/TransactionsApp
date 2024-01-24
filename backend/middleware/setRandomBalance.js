const { Account, User } = require("../db")

async function setRandomBalance(id){

    try{
        const randomBalance = Math.floor(Math.random()*10000)+1;
        const account = new Account();
        account["userId"] = id;
        account.balance = randomBalance;
        await account.save();
        return randomBalance;
    }catch(err){
        throw new Error(err);
    }

}

module.exports = {
    setRandomBalance
}