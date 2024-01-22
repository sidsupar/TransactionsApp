const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const {router} = require("./routes/index.js");

//Import the env variables from .env
require("dotenv").config();

//Necessary to include cors options, when dealing with frontend and backend working on different ports
app.use(cors(
    {
        origin:true,
        credentials:true,
    }
));

//Bodyparse the x-www-form-url and json data in the body to all routes
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Connect to the mongo server with db name as defined in .env
mongoose.connect(process.env.MONGO_URL + process.env.DB_NAME, (err)=>{
    if(err){
        console.log("Error connecting to the database", err);
    }else{
        console.log("Connected to the mongo server successfully");
    }
});

//All routes to /api/v1 will be redirected to router
app.use("/api/v1", router);

//Listen to the UNIX socket connection at port defined in the config
const port = process.env.PORT ||  3000;
app.listen(port, (err)=>{
    if(!err){
        console.log("Listening on port "+port);
    }else{
        console.log("Error connecting to the port"+port+" error: "+err);
    }
})



