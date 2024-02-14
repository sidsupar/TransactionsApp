const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const {router} = require("./routes/index.js");
const session = require('express-session')
const MongoStore = require("connect-mongo");

//Import the env variables from .env
require("dotenv").config();

//Connect to mongo
mongoose.connect(process.env.MONGO_URL+process.env.DB_NAME)
        .then((data)=>{
                console.log("Connected to mongo server DB_NAME: "+process.env.DB_NAME);
        }).catch((err)=>{
                console.log("Error connecting to mongo server MongoURL: "+process.env.MONGO_URL+" DB_NAME: "+process.env.DB_NAME);
                console.log("Error: "+err);
        });

app.use(session(
        {
            secret: process.env.EXPRESS_SESSION_SECRET,
            resave: true,
            saveUninitialized: false,
            cookie: { maxAge: 24 * 60 * 60 * 1000 },
            store: MongoStore.create({
                client: mongoose.connection.getClient(),
                dbName: process.env.MONGO_DB_NAME,
                collectionName: "sessions",
                stringify: false,
                autoRemove: "interval",
                autoRemoveInterval: 1
            })
        }) 
);    

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

//All routes to /api/v1 will be redirected to router
app.use("/api/v1", router);

//Global catch
app.use((err, req, res, next)=>{

    res.status(500).json({
        msg:"Error occured",
        err:err,
    });

})

//Listen to the UNIX socket connection at port defined in the config
const port = process.env.PORT ||  3000;
app.listen(port, function (err){
    if(err){
        console.log("Error listening to port " + port);
    }else{
        console.log("Connected to port " + port);
    }
})



