const jwt = require("jsonwebtoken");
const Muser = require("../model/userSchema");

const authenticate = async(req, res, next) => {
    try{
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await Muser.findOne({_id: verifyToken._id, "tokens.token": token});

        if(!rootUser){
            throw new Error("User not found");
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
    next();
    }catch(err){
        res.status(401).send("Unauthorized: Token not provided");
        console.log(err);
    }
}

module.exports = authenticate;