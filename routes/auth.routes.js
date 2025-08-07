const express = require('express');
const {userSignup,userLogin} = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middlewares")


const authRouter = express.Router();


authRouter.post("/signup",userSignup);
authRouter.post("/login",userLogin);





module.exports = authRouter;