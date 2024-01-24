const express = require("express");
const router = express.Router();
const {userRouter} = require("./user.js");
const {accountsRouter} = require("./accounts.js");

router.use("/user", userRouter);
router.use("/account", accountsRouter)

module.exports = {
    router
}

