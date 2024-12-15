const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;
const conn = async () => {
    try {
    (await mongoose.connect(MONGODB_URI))
        console.log("Connection done")
    
} catch (error){
 console.log(error);
}
};

module.exports = conn;

