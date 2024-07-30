require('dotenv').config();

const express = require("express");
// const fs = require("fs");
const mongoose = require("mongoose");


const { connectMongoDB } = require("./connection");
const userRouter = require("./Routes/user");

const app = express();
const PORT = process.env.PORT || 8000;

//Connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
}).then( () => 
  console.log("Mongodb connected")
);

//Middleware - Plugin
app.use(express.urlencoded({ extended : false}));

//Routes
app.use("/user",userRouter);

const startServer = async () => {
  try {
    app.listen(PORT, () => console.log('Server started at PORT:', PORT));
  } catch (error) {
    console.error('Failed to connect to the database', error);
  }
};

startServer();

