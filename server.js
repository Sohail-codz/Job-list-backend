const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors')
const User = require('./models/userModel')
const JobsList = require('./models/jobsModel')
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

app.post('/register', async (req,res)=>{
    try{
        const { name, email, mobile, password } = req.body;
        if(!name || !email || !mobile || !password){
            return res.status(400).json({
                error: "please provide all the required fields"
            })
        }

        const user = await User.findOne({ email });
        if(user){
            return res.status(409).json({
                error: "User already exists"
            })
        }
        const ePass = await bcrypt.hash(password, 10);
        await User.create({ name, email, mobile, password: ePass })
        res.status(201).json({
            message: "User registered successfully"
        });
    }
    catch(error){
        res.status(500).json({
            error: error.message
        });
    }
});

app.post('/login', async (req,res)=>{
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({
                error: "please provide the details"
            })
        }
        const user = await User.findOne({ email });
        if(!user){
            return res.status(401).json({
                error: "User not found"
            })
        }
        const passCompare = await bcrypt.compare(password, user.password)
        if(!passCompare){
            return res.status(401).json({
                error: "Invalid password"
            })
        }
        const token = jwt.sign(
            {email: user.email},
            process.env.JWT_SECRETKEY,
            { expiresIn: '1h' }
        );
        res.status(200).json({
            message: "login Success",
            token,
        })
    }
    catch(error){
        res.status(500).json({
            error: "Failed to login"
        });
    }
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