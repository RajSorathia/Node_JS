const mongoose = require("mongoose");

const User = new mongoose.Schema({
    picpath : Image
})

const Usermodel = mongoose.model("files",User);
module.exports = Usermodel;