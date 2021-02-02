const express = require("express");
//const { update } = require("lodash");
const router = express.Router();


const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById, read, update, purchaseHistory} = require("../controllers/user");

router.get("/secret/:userId", requireSignin,isAuth, isAdmin, (req,res) => {
    res.json({
        user: req.profile
    });
});

router.get('/user/:userId', requireSignin, isAuth, read);
router.put('/user/:userId', requireSignin, isAuth, update);
router.get("/orders/by/user/:userId", requireSignin, isAuth, purchaseHistory);

//anytime there parameter called userId in the route,
// the userById mothode will execute and provide the user profile info
router.param("userId", userById);


module.exports = router;
