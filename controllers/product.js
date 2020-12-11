const formidable = require("formidable")// to upload photos or any form data
const _ = require("lodash");// to upload photos or any form data
const fs = require("fs")
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");
const { result } = require("lodash");

exports.productById = (req, res, next,id) => {
   Product.findById(id).exec((err, product) => {
       if(err || !product) {
           return res.status(400).json({
               error: "Product not found"
           });
       }
       req.product = product;
       next();
   });
}

exports.read = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
};


exports.create = (req, res) => {
   let form = new formidable.IncomingForm()//to allow any data type
   form.keepExtensions = true // any data extension 
   form.parse(req, (err, fields, files) => {
       if(err) {
           return res.status(400).json({
               error: "Image could not be uploaded"
           });
       }
           // check for all fields
           const {name, description,price, category, quantity, shipping} = fields
           if(! name || !description || !price || !category || !quantity || !shipping) {
               return res.status(400).json({
                   error: "All field are required"
               })
           }
       let product = new Product(fields)
       if(files.photo) {  
           if (files.photo.size > 1000000) {
               return res.status(400).json({
                   error: "Image size must be less than 1mb"
               });
           } 
       
             product.photo.data = fs.readFileSync(files.photo.path)
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

exports.remove = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "Product deleted successfully"
        });
    });
};

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()//to allow any data type
    form.keepExtensions = true // any data extension 
    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
            // check for all fields
            const {name, description,price, category, quantity, shipping} = fields
            if(! name || !description || !price || !category || !quantity || !shipping) {
                return res.status(400).json({
                    error: "All field are required"
                })
            }
        let product = req.product;
        //using exten methode from lodash it take two arguments
        // the product and the updated fields
        product = _.extend(product, fields);
        if(files.photo) {  
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image size must be less than 1mb"
                });
            } 
        
              product.photo.data = fs.readFileSync(files.photo.path)
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

 /**
 * sell / arrival
 * by sell = /products?sortBy=sold&order=desc&limit=4
 * by arrival = /products?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, then all products are returned
 */

 exports.list = (req, res) => {
     let order = req.query.order ? req.query.order : "asc"
     let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
     let limit = req.query.limit ? parseInt(req.query.limit) : 6

     Product.find()
            .select("-photo")
            .populate("category")
            .sort([[sortBy, order]])
            .limit(limit)
            .exec((err, products) => {
                if(err) {
                    return res.status(400).json({
                        error: "Products not found"
                    })
                }
                res.send(products);
            });
 };