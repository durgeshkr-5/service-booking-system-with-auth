const mongoose = require('mongoose');
require("dotenv").config();

const mongo_url = process.env.MONGO_URI

function connectMongoDB(){
    mongoose.connect(mongo_url)
    .then(() => {
        console.log(`MongoDb connected Successfully!!!!`);
    })
    .catch(() => {
        console.log(error)
    })
}

module.exports = connectMongoDB;