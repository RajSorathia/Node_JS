const mongoose = require("mongoose");

const User = new mongoose.Schema({
    picpath : String
})

const Usermodel = mongoose.model("files",User);
module.exports = Usermodel;