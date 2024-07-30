require('dotenv').config();
const multer = require("multer");
const Usermodel = require("./models/user");
const path = require("path");
const express = require("express");

const mongoose = require("mongoose");

const { connectMongoDB } = require("./connection");

const app = express();
const PORT = process.env.PORT || 5050;
// const PORT = 8000;

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        return cb(null, "./uploads");
    },
    filename: function (req, file, cb){
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const upload = multer({ storage });

app.set("view engine", "ejs");
app.set("views", path.resolve("./Views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.get("/", (req, res) => {
    return res.render("homepage");
});

//Connection
mongoose.connect(process.env.MONGO_URL).then( () => 
    console.log("Mongodb connected")
);
  
app.post("/upload", upload.single("profileImage"), (req, res) => {
    Usermodel.create({ image: req.file.filename })
    .then(result => res.json(result))
    .catch(err => console.log(err))

    return res.redirect("/");
})

const startServer = async () => {
    try {
      app.listen(PORT, () => console.log('Server started at PORT:', PORT));
    } catch (error) {
      console.error('Failed to connect to the database', error);
    }
  };
  
  startServer();
// app.listen(PORT, () => console.log(`Server Started at this PORT : 8000`));