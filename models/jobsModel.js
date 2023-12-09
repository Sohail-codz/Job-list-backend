const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    companyName:{
        type: String,
        required: [true,'Company Name is required'],
    },
    logoUrl:{
        type: String,
        required: true,
    },
    jobPosition:{
        type: String,
        required: true,
    },
    monthlySalary:{
        type: Number,
        required: true,
    },
    jobType:{
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'],
        required: true,
    },
    remoteNoffice:{
        type: String,
        enum: ['Remote', 'Office'],
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    jobDescription:{
        type: String,
        required: true,
    },
    aboutCompany:{
        type: String,
        required: true,
    },
    skillsRequired:{
        type: String,
        required: true,
    },
    information:{
        type: String,
        required: true,
    },
})

const jobsModel = mongoose.model('JobsList', jobSchema);

module.exports = jobsModel;