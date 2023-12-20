const express = require('express');
const router = express.Router();
const JobsList = require('../models/jobsModel');
const authHandler = require('../middlewares/authHandler');
const errorHandler = require('../middlewares/errorHandler');

router.post('/job-posts', authHandler, async (req,res)=>{
    const {
        companyName,
        logoUrl,
        jobPosition,
        monthlySalary,
        jobType,
        remoteNoffice,
        location,
        jobDescription,
        aboutCompany,
        skillsRequired,
        information,
    } = req.body;
    let skillsArray = skillsRequired;
    if(typeof skillsRequired === 'string'){
        skillsArray = skillsRequired.split(',').map(skill => skill.trim());
    }
    try{
        await JobsList.create({
            companyName,
            logoUrl,
            jobPosition,
            monthlySalary,
            jobType,
            remoteNoffice,
            location,
            jobDescription,
            aboutCompany,
            skillsRequired: skillsArray,
            information,
        })
        res.status(201).json({
            message: "Job listed successfully"
        });
    }
    catch(error){
        errorHandler(res,error)
    }
})

module.exports = router;