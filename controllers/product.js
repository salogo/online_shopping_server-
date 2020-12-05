const formidable = require("formidable")// to upload photos or any form data
const _ = require("lodash");// to upload photos or any form data
const fs = require("fs")
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");
const { result } = require("lodash");


exports.create = (req, res) => {
   let form = new formidable.IncomingForm()//to allow any data type
   form.keepExtensions = true // any data extension 
   form.parse(req, (err, fields, files) => {
       if(err) {
           return res.status(400).json({
               error: "Image could not be uploaded"
           })
       }
       let product = new Product(fields)
       if(files.photo) {    
             product.photo.data = fs.readFilesSync(files.photo.path)
             product.photo.contenType = files.photo.type        
       }
       product.save(() => {
           if(err) {
              return res.status(400).json({
                  error: errorHandler(err)
              });
           }
           res.json(result);
       });
   });
};