const express = require("express");
const router = express.Router();

const { create, categoryById, read, update, remove, list } = require("../controllers/category");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");


router.get("/category/:categoryId", read);
router.post("/category/create/:userId",requireSignin, isAuth,isAdmin , create );
router.put("/category/:categoryId/:userId",requireSignin, isAuth,isAdmin , update );
router.delete("/category/:categoryId/:userId",requireSignin, isAuth,isAdmin , remove );
router.get("/categories", list);

//category middleware
router.param("categoryId", categoryById);
//anytime there parameter called userId in the route,
// the userById mothode will execute and provide the user profile info
router.param("userId", userById);


module.exports = router;