const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { userSignUpInputValidation } = require("../middleware/userSignUpInputValidation");
const { userRedundancyCheck } = require("../middleware/userRedundancyCheck");
const { userAuth } = require("../middleware/userAuth");
const { User } = require("../db");
const { validUserCheck } = require("../middleware/validUserCheck");
const zod = require("zod");
const { setRandomBalance } = require("../middleware/setRandomBalance");
const { checkLoggedIn } = require("../middleware/checkUserLoggedIn");


router.post("/signup",userSignUpInputValidation, userRedundancyCheck,async (req, res)=>{

    //Add user to the DB in User collection
    try{
        const username = req.body.username;
        const password = req.body.password;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;

        const user = new User();
        user.username = username;
        user.password = password;
        user.firstname = firstname;
        user.lastname = lastname;

        await user.save();
        //Set user balance(random)
        let userBalance = 0;
        let userAdded = await User.findOne({username:username});
        if(userAdded){
            userAdded = userAdded["_doc"];
            const {_id} = userAdded;
            userBalance = await setRandomBalance(_id);
        }else{
            throw new Error("User not found in DB after signing up");
        }
        res.status(201).json({
            msg:"User created successfully",
            balance:userBalance
        })
    }catch(err){
        res.status(503).json({
            msg:"User SignUP: Not successful: Internal Error",
            err:err.message
        })
    }

});

router.post("/signin", validUserCheck,(req,res)=>{
    req.session.username = req.body.username
    try{
        const username = req.body.username;
        const password = req.body.password;
        const jwtToken = jwt.sign({username},process.env.SECRET_KEY);

        res.status(200).json({
            msg:"User signed in successfully",
            token:jwtToken
        })

    }catch(err){
        res.status(503).json({
            msg:"Error occured while signing in the user",
            err:err.message,
        })
    }

});
router.get("/checkLoginStatus",(req,res)=>{
    console.log(`session username: ${req.session.username}`);
    try{
        if(req.session.username != undefined){
            res.status(201).json({
                isLoggedIn: true,
                status:"ok"
            })
        }else{
            res.status(503).json({
                isLoggedIn:false,
                status:"bad"
            })
        }
    }catch(err){
        res.status(504).json({
            error:err.message,
            route:"checkLoginStatus"
        });
    }
    
})
router.use(userAuth);
router.use(checkLoggedIn);

router.put("/" ,async (req, res)=>{
    console.log(`session username: ${req.session.username}`);
    const zodUserUpdateObject = zod.object({
        password:zod.string().optional(),
        firstname:zod.string().optional(),
        lastname:zod.string().optional(),
    }).strict();
    
    try{
        const tokenRec = req.headers.authorization.trim().split(" ")[1];
        const username =  jwt.decode(tokenRec).username;
        console.log(`username rec from token in update: ${username}`)
        const user = await User.findOne({
            username:username
        });
        const updateDataFormatCheck = zodUserUpdateObject.safeParse(req.body);
        // console.log(updateDataFormatCheck);
        if(updateDataFormatCheck.success == false){
            throw new Error("Invalid data to update in the DB");
        }

        if(user){
            await User.updateOne({_id: user["_id"]},{$set:req.body});
            res.status(201).json({
                msg:"User data updated successfully",
                status:"ok"
            })
        }else{
            throw new Error("User not found to update data in DB");
        }

    }catch(err){
        res.status(403).json({
            msg:"Error occured while updating user info",
            err:err.message
        })
    }

})

router.get("/bulk", async(req, res)=>{
    console.log(`session username: ${req.session.username}`);
    const filter = req.query.filter;
    console.log("Filter = "+filter);

    try{
        
        const userRes = await User.find({
            $or: [
                {
                    firstname: {$regex: filter, $options:"i"}
                },
                {
                    lastname: {$regex: filter, $options:"i"}
                }
            ]
        });
        // Convert cursor to array
        console.log(userRes);
            if(true){
            const filteredData = userRes.map((user)=>{
                user = user["_doc"];
                const {_id, password, ...userUpdated} = user;
                return userUpdated;
            });

            res.status(200).json({
                filteredData
            })
        }
        
    }catch(err){
        res.status(500).json({
            msg:"Something went wrong",
            err:err.message
        })
    }

});

module.exports = {
    userRouter: router
}