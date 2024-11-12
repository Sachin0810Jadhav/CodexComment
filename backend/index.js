const express = require("express");
require('dotenv').config(); 

const app = express();

const PORT = 3000;

const tryRouter = require("./routes/tryCodexComment");

const userRouter = require("./routes/user")

const cors = require("cors")

app.use(express.json());

app.use(cors())

app.get("/",(req,res)=>{
    res.send("hii")
})

app.use("/tryCodexComment",tryRouter);

app.use("/user",userRouter);


app.listen(PORT,(req,res)=>{
    console.log(`server running on posrt ${PORT}`)
})
