const jwt = require("jsonwebtoken");

function userAuth(req, res, next){

    try{

        const token = req.headers.authorization.trim().split(" ")[1];
        // console.log(`token recieved: ${token}`);
        try{
            jwt.verify(token, process.env.SECRET_KEY);
            next();
        }catch{ 
            throw new Error("Invalid authorization token");
        }
    }catch(err){

        res.status(401).json({
            msg:"User not logged in",
            status:"Not ok",
            err:err.message
        })

    }

}

module.exports = {
    userAuth
}