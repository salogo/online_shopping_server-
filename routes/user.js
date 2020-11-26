const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("hello from server side!!!");
});

module.exports = router;