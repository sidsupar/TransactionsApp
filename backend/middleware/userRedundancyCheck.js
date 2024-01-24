const { User } = require("../db");

async function userRedundancyCheck(req, res, next) {

    //get username and password from request object
    const username = req.body.username;
    //Hit a request to the DB to check whether the user already exists in DB or not
    try{

        const userRes = await User.find({
            username:username,
        });

        if(userRes.length > 0){
            throw new Error("Provided user already registered with us with the username: "+username);
        }else{
            console.log(`user ${username} connected to signUp`);
            next();
        }

    }catch(err){
        res.status(401).json({
            status:"Not Ok",
            msg:"Error while checking user redundancy in userRedundancy Middleware",
            err:err.message
        })
    }

}

module.exports = {
    userRedundancyCheck
}