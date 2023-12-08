const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

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
    console.log(`Server running on ${PORT}`);
})