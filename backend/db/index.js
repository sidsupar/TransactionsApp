const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
                   {

                        firstname:{
                            type:String,
                            required:true,
                        },
                        lastname:{
                            type:String,
                            required:true,
                        },
                        username:{
                            type:String,
                            required:true,
                        },
                        password:{
                            type:String,
                            required:true,
                        },
                   }
);

const User = mongoose.model('User', UserSchema);

module.exports = {
    User
}