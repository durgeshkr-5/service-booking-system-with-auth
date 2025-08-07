
require("dotenv").config();
const User = require('../model/user.model');
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require('validator');

const secretkey =  process.env.JWT_SECRET_KEY;
const options = {expiresIn: '1h'}

const userSignup = async(req,res) => {
    try {
        const {name,email,password,role} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({msg:"Name, email and password are required!!!"});
        }

        //validate email
        if(!validator.isEmail(email)){
            return res.status(400).json({msg:"Invalid Email!!!"})
        }

        //check if email is already exist or not
        const checkUser = await User.findOne({email});
        if(checkUser){
            return res.status(400).json({msg:"Email is already exists, please try with another email!!!"})
        }

        //hashed password
        const hashedPassowrd = await bcryptjs.hash(password,10);
        //save user
        const newUser =  new User({name,email,password:hashedPassowrd,role:role || 'user'});

        const user = await newUser.save();


        return res.status(201).json({msg:"User is  registered successfully!!!!",user})
        
    } catch (error) {
        // console.log(error);
        return res.status(500).json({msg:"Internal server error"})
    }
}


const userLogin = async(req,res) => {
    try {

        const {email,password,} = req.body;
        if(!email || !password){
           return res.status(400).json({msg:"Email and password are required!!!"}); 
        }

        //validate email
        if(!validator.isEmail(email)){
            return res.status(400).json({msg:"Invalid Email!!!"})
        }

        //find user in the db
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg:"User is not found!!!"})
        }

        //match the password
        const match = bcryptjs.compare(password,user.password);
        if(!match){
            return res.status(400).json({msg:"Wrong Credentials!!!"})
        }

        //generate token
        const token = await jwt.sign({userId:user._id,email:user.email,role:user.role},secretkey,options);
       


        return res.status(201).json({msg:"User is  Logged in!!!!",token})
        
    } catch (error) {
        // console.error(error);
        return res.status(500).json({msg:"Internal server error"})
    }
}



module.exports = {userSignup,userLogin};