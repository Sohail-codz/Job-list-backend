const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.get('/',(req,res)=>{
    res.send("hey ya!")
})

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})