const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017";

async function connectToMongo() {
    await mongoose
        .connect("mongodb://localhost:27017/")
        .then(() => console.log("Connected to Mongo Successfully"))
        .catch((err) => console.log(err));
}

module.exports = connectToMongo;