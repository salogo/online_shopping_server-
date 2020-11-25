const express = require("express");
const app = express();
require("dotenv").config();


app.get("/", (req,res) => {
   res.send("hello from server side")
});

const port = process.env.PORT || 8000

app.listen(port, ()=> {
   console.log(`Sever is runnig on port ${port}`)
})