const mongoose = require("mongoose");
const DB = process.env.DB;

mongoose.connect(DB, {
    // useNewUrlParser: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true
}).then(()=> {
    console.log("MongoDB connection successful");
}).catch((err)=> {
    console.log("MongoDB connection failed");
});