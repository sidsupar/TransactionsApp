const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
                   {

                        firstname:{
                            type:String,
                            required:true,
                            index:true
                        },
                        lastname:{
                            type:String,
                            required:true,
                            index:true
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


const AccountSchema = mongoose.Schema({
                            userId:{
                                type:mongoose.Schema.Types.ObjectId,
                                ref: "User",
                                required:true
                            },
                            balance:{
                                    type:Number,
                                    required:true
                            }
                      }
)
const User = mongoose.model('User', UserSchema);
const Account = mongoose.model("Account", AccountSchema);
module.exports = {
    User,
    Account
}