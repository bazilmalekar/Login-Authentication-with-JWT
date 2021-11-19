const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

//dotenv configuration
dotenv.config({path: "./config.env"});
PORT = process.env.PORT;
//Mongodb connection 
require("./db/conn");
//User schema
const Muser = require("./model/userSchema");
//get data in json format
app.use(express.json());
//express router
app.use(require("./router/auth"));

app.listen(PORT, ()=>{
    console.log("Server is active on port 5000");
});