const express = require("express");

const router = express.Router();

const {User} = require("../db/index")

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const SECRET = "This is Secret";

router.post("/signup",async (req,res)=>{
    const {username,password,firstname,lastname} = req.body;
    const user = await User.findOne({username});
    if(user){
        res.json({
            msg:"username already exists"
        })
    }
    else{
        const salt = await bcrypt.genSalt(10);
        const hassPass = await bcrypt.hash(password,salt);
        const newUser = User.create({
            username,
            password:hassPass,
            firstname,
            lastname
        })
        const token =  jwt.sign({userId: newUser._id},SECRET);
        res.json({
            msg:"user created successfully",
            token
        })
    }
})

router.post("/signin",async(req,res)=>{
    const {usrname,password} = req.body;

    const user = await User.findOne({usrname});
    if(user){
        if(bcrypt.compare(password,user.password)){
            const token = jwt.sign({userId: user._id},SECRET);
            res.json({
                msg:"signin scuccessful",
                token
            })
        }
        else{
            res.json({
                msg:"invalid credentials"
            })
        }
    }
    else{
        res.json({
            msg:"invalid credentials"
        })
    }
})

module.exports = router;