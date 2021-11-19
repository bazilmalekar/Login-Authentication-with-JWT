const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const Muser = require("../model/userSchema");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

router.get("/", (req, res) => {
    res.send("Hello from Router Home Page!");
});

router.get("/about", authenticate, (req, res) => {
    console.log("Token authentication About page");
    res.send(req.rootUser);
});

//Getting Data for contact page
router.get("/getData",authenticate, (req, res) => {
    console.log("Getting Contact page data");
    res.send(req.rootUser);
});

router.post("/contact", authenticate, async(req, res) => {
    try{
        const {name, email, phone, message} = req.body;

        if(!name || !email || !phone || !message){
            throw new Error("Please fill all the fields");
        }
    
        const userContact = await Muser.findOne({_id: req.userID});
        if(userContact){
            const userMessage = await userContact.addMessage(name, email, phone, message);
            await userContact.save();
            res.status(201).json({message: "Message sent successfully"});
        }
    }catch(err){
        console.log(err);
    }
});

router.post("/login", async(req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            res.status(422).json({error: "Please fill all the fields"});
        }

        const userLogin = await Muser.findOne({email: email});
        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);
            //Json Web Token
            const token = await userLogin.generateAuthToken();

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now + 25892000000),
                httpOnly: true
            });

            if(!isMatch){
                res.status(422).json({error: "Invalid Credentials"});
            }else{
                res.status(201).json({message: "User login Successful"});
            }
        }else{
            res.status(422).json({error: "Invalid Credentials"});
        }
    }catch(err){
        console.log(err);
    }
});

router.post("/register", async(req, res) => {
    try{
        const {name, email, phone, work, password, cpassword} = req.body;

        if(!name || !email || !phone || !work || !password || !cpassword){
            res.status(422).json({error: "Please fill all the fields"});
        }

        const userExists = await Muser.findOne({email: email});
        if(userExists){
            res.status(422).json({error: "Email already exists"});
            console.log("Email already exists");
        }else if(password !== cpassword){
            res.status(422).json({error: "Password does not match"});
            console.log("Password does not match");
        }else{
            const user = new Muser({
                name, email, phone, work, password, cpassword
            });
            await user.save();
            res.status(201).json({message: "User registered successfully"});
            console.log("User registered successfully");
        }
    }catch(err){
        console.log(err);
    }
});

router.get("/logout", async(req, res)=> {
    try{
        console.log("User logged out successfully");
        res.clearCookie("jwtoken", {path: "/"});
        res.status(200).send("User logged out successfully");
    }catch(err){
        console.log(err);
    }
});

module.exports = router;