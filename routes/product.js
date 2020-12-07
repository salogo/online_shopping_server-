const express = require("express");
const router = express.Router();

const { create, productById, read } = require("../controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");


router.get("/product/:productId", read)
router.post("/product/create/:userId",requireSignin, isAuth,isAdmin , create );


//anytime there parameter called userId in the route,
// the userById mothode will execute and provide the user profile info
router.param("userId", userById);
// same exampl for parameter  
router.param("productId", productById)

module.exports = router;