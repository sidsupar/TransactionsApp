function checkLoggedIn(req, res, next){

    try{
        if(req.session.username != undefined){
            next();
        }
    }catch(err){
        console.log(err.message);
        res.status(503).json({
            error:"User session middleware not qualified",
            status:"bad"
        })
    }

}

module.exports = {
    checkLoggedIn
}