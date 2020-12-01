const express = require("express");
const router = express.Router();


const { requireSignin } = require("../controllers/auth");
const { userById} = require("../controllers/user");

router.get("/secret/:userId", requireSignin, (req,res) => {
    res.json({
        user: req.profile
    });
});

//anytime there parameter called userId in the route,
// the userById mothode will execute and provide the user profile info
router.param("userId", userById);


module.exports = router;