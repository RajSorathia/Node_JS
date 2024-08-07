// require('dotenv').config();

// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const multer =  require('multer');
// const path = require('path');
// const Usermodel = require("./models/user");

// const uri = 'mongodb+srv://rajsorathiyaacusion:rajacusion@cluster0.z8vtgf7.mongodb.net/UploadFileData?retryWrites=true&w=majority&appName=Cluster0';

// const storage = multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,'.public/uploads/')
//     },
//     filename:function(req,file,cb){
//         cb(null,file.originalname)
//     }
// })

// const upload = multer({
//     storage:storage
// });
// const app = express();

// mongoose.connect(uri)
// .then(()=>console.log('connected')).catch(err=>console.log('error ocured',err));

// app.set('views',path.resolve(__dirname,'Views'));
// app.set('view engine','ejs');

// const pathh = path.resolve(__dirname,'public');
// app.use(express.static(pathh));
// app.use(bodyParser.urlencoded({extended:false}));

// app.get("/", async (req, res) => {
//     try {  
//         const data = await Usermodel.find().exec();
//         if (data.length > 0) {
//             res.render('homepage', { data: data });
//         } else {
//             res.render('homepage', { data: {} });
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(500).send('An error occurred');
//     }
// });

// app.post("/", upload.single('pic'), async (req, res) => {
//     try {
//         const x = 'uploads/' + req.file.originalname;
//         const temp = new Usermodel({
//             picpath: x
//         });
//         await temp.save();
//         res.redirect('/');
//     } catch (err) {
//         console.log(err);
//         res.status(500).send('An error occurred');
//     }
// });

// // app.post('/',upload.single('pic'),(req,res)=>{
// //     var x = 'uploads/'+req.file.originalname;
// //     var temp = new Usermodel({
// //         picpath:x
// //     })
// //     temp.save((err,data)=>{  
// //         if(err){
// //             console.log(err)
// //         }
// //         res.redirect('/')
// //     })
// // })

// app.get("/download/:id", async (req, res) => {
//     try {
//         const data = await Usermodel.findById(req.params.id).exec();
//         if (data && data.picpath) {
//             // Change this line
//             const x = path.join(__dirname, data.picpath);
//             res.download(x);
//         } else {
//             res.status(404).send('File not found or picpath is undefined');
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(500).send('An error occurred');
//     }
// });

// app.get('/download/:id',(req,res)=>{
//     Usermodel.find({_id:req.params.id},(err,data)=>{
//          if(err){
//              console.log(err)
//          }
//          else{
//              var x= __dirname+'/public/'+data[0].picpath;
//              res.download(x)
//          }
//     })
// })

// app.get("/list", async (req, res) => {
//     try {
//         const files = await Usermodel.find().select('picpath createdAt').exec();
//         const fileDetails = files.map(file => ({
//             id: file._id,
//             filename: path.basename(file.picpath),
//             uploadDate: file.createdAt,
//         }));
//         res.json(fileDetails);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'An error occurred while fetching file list' });
//     }
// });

// const PORT = process.env.PORT || 3000;
// const startServer = async () => {
//     try {
//       app.listen(PORT, () => console.log('Server started at PORT:', PORT));
//     } catch (error) {
//       console.error('Failed to connect to the database', error);
//     }
//   };
  
//   startServer();


var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer =  require('multer');
var path = require('path');

var picSchema= new mongoose.Schema({
    picpath:String
})

var picModel = mongoose.model('picsdemo',picSchema);

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/uploads')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
var upload = multer({storage:storage})

var app = express();

const uri = 'mongodb+srv://rajsorathiyaacusion:rajacusion@cluster0.z8vtgf7.mongodb.net/UploadFileData?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri)
.then(()=>console.log('connected')).catch(err=>console.log('error ocured',err));

app.set('views',path.resolve(__dirname,'Views'));
app.set('view engine','ejs');

var pathh = path.resolve(__dirname,'public');
app.use(express.static(pathh));
app.use(bodyParser.urlencoded({extended:false}));


app.get('/',(req,res)=>{
    picModel.find((err,data)=>{
        if(err){
            console.log(err)
        }
        else if(data.length>0){
            res.render('homepage',{data:data})
        }
        else{
            res.render('homepage',{data:{}})
        }
    })
})

app.post('/',upload.single('pic'),(req,res)=>{
    var x = 'uploads/'+req.file.originalname;
    var temp = new picModel({
        picpath:x
    })
    temp.save((err,data)=>{
        if(err){
            console.log(err)
        }
        res.redirect('/')
    })
})


app.get('/download/:id',(req,res)=>{
    picModel.find({_id:req.params.id},(err,data)=>{
         if(err){
             console.log(err)
         }
         else{
             var x= __dirname+'/public/'+data[0].picpath;
             res.download(x)
         }
    })
})


app.get("/list", async (req, res) => {
    try {
        const files = await picModel.find().select('picpath createdAt').exec();
        const fileDetails = files.map(file => ({
            id: file._id,
            filename: path.basename(file.picpath),
            uploadDate: file.createdAt,
        }));
        res.json(fileDetails);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching file list' });
    }
});


// var port  = process.env.PORT || 3000 ;
// app.listen(port,()=>console.log('server running at port'+port));

const PORT = process.env.PORT || 3000;
const startServer = async () => {
    try {
      app.listen(PORT, () => console.log('Server started at PORT:', PORT));
    } catch (error) {
      console.error('Failed to connect to the database', error);
    }
  };
  
  startServer();