var express = require('express'); 
const uploadRouter = express.Router(); 
var multer=require('multer');
const path = require('path');

var storageV = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../assets/voiture'));
    },
    filename: function (req, file, cb) {
        if(!file.originalname.match(/\.(jpeg|jpg|png|JPEG|JPG|PNG)$/)){
            var err=new Error();
            err.code="filetype";
            return cb(err);
        }else{
            cb(null,file.originalname);
        }
    }
    
});
var uploadV = multer({ storage: storageV }); 
uploadRouter.post('/image',uploadV.single('image'), (req, res) =>{
    try {
        if(!req.file){
          return  res.json({success:false,message:'no file selected'});
        }
        else{
       return res.json({success:true,message: req.file});
        
        }
        
    } catch (error) {
        console.log(error);
        if(err.code=='LIMIT_FILE_SIZE'){
            res.json({success:false,message:'file is tool arge'});
        }else if(err.code=='filetype'){
            res.json({success:false,message:'file type is invalid'});
        }else{
            console.log(err)
            res.json({success:false,message:'file is not selected'});
        }
    }
});

var storageM = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../assets/marque'));
    },
    filename: function (req, file, cb) {
        if(!file.originalname.match(/\.(jpeg|jpg|png|JPEG|JPG|PNG)$/)){
            var err=new Error();
            err.code="filetype";
            return cb(err);
        }else{
            cb(null,file.originalname);
        }
    }
    
});
var uploadM = multer({ storage: storageM }); 
uploadRouter.post('/logo',uploadM.single('logo'), (req, res) =>{
    try {
        if(!req.file){
          return  res.json({success:false,message:'no file selected'});
        }
        else{
       return res.json({success:true,message: req.file});
        
        }
        
    } catch (error) {
        console.log(error);
        if(err.code=='LIMIT_FILE_SIZE'){
            res.json({success:false,message:'file is tool arge'});
        }else if(err.code=='filetype'){
            res.json({success:false,message:'file type is invalid'});
        }else{
            console.log(err)
            res.json({success:false,message:'file is not selected'});
        }
    }
});

module.exports = uploadRouter;
