const { User } = require("../db");

async function validUserCheck(req, res, next){

    try{

        const username = req.body.username;
        const password = req.body.password;

        const userRes = await User.find({
            username:username,
            password:password,
        });
        
        if(userRes.length > 0){
            next();
        }else{
            throw new Error("Invalid username or password");
        }
    }catch(err){
        res.status(503).json({
            msg:"Error occured while conducting user existence check in userExitenece middleware",
            err:err.message
        })
    }

}

module.exports = {
    validUserCheck
}