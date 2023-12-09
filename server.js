const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userModel = require('./models/userModel')
const jobsModel = require('./models/jobsModel')
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.get('/',(req,res)=>{
    res.send("hey ya!")
})
app.get('/health',(req,res)=>{
    res.status(200).json({
        service: 'Job list backend',
        status: 'active',
        time: new Date(),
    })
})

app.listen(PORT,()=>{
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log(`Server running on http://localhost:${PORT}`);
    }).catch((error)=>{
        console.log(error)
    })
})