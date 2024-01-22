import { User } from "../db";

export async function userRedundancyCheck(req, res, next) {

    //get username and password from request object
    const username = req.body.username;
    const password = req.body.password;

    //Hit a request to the DB to check whether the user already exists in DB or not
    try{

        const userRes = await User.find({
            username:username,
            password:password,
        });

        if(userRes.length > 0){
            console.log(`user ${username} connected to signUp`);
            next();
        }else{
            throw new Error("Provided user already registered with us with the username: "+username);
        }

    }catch(err){

    }

}