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

router.put('/job-posts/:id', authHandler, async (req,res)=>{
    const jobId = req.params.id;
    const {companyName,jobPosition,remoteNoffice} = req.body;
    
    try{
        const updatedJob = await JobsList.findByIdAndUpdate(jobId,
            {
                companyName,
                jobPosition,
                remoteNoffice,
            },{new: true});
        if(!updatedJob){
            return res.status(404).json({message: 'Job not found'});
        }
        res.status(200).json({
            message: 'Job updated successfully',
            updatedJob,
        })
    }
    catch(error){
        errorHandler(res,error);
    }
})

module.exports = router;