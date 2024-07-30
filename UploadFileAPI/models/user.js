const mongoose = require("mongoose");

const User = new mongoose.Schema({
    image : String
})

const Usermodel = mongoose.model("files",User);
module.exports = Usermodel;