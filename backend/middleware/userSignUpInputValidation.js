const zod = require("zod");

//Zod validation object
const userSignUpObject = zod.object({
    username:zod.string().email(),
    firstname:zod.string(),
    lastname:zod.string(),
    password:zod.string(),
})

function userSignUpInputValidation(req, res, next){

    try{
        //Safeparse allows to check the given element, and prevent throwing error in case of invalid element format.
        const {success} = userSignUpObject.safeParse(req.body);
        if(success == true){
            next();
        }else{
            const {error} = userSignUpObject.safeParse(req.body);
            throw new Error("Invalid Input while signing up: "+error);
        }
    }catch(err){
        res.status(500).json({
            msg:"Error occured while validating signup input",
            err:err.message
        })
    }

}

module.exports = {
    userSignUpInputValidation
}