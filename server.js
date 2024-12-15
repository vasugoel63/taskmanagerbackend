const express = require("express");
var bcrypt = require('bcryptjs');

const app = express();
const cors = require("cors");
const userRoutes = require("./Routes/userRoutes");
const authRoutes = require("./Routes/authRoutes");
require('dotenv').config();

const conn= require('./conn');

conn();
app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.get('/',(req,res)=>{
    res.send("welcome");
})
app.listen(process.env.PORT, ()=>{
    console.log("Server started")
})