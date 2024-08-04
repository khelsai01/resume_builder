const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    personalInfo: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        linkedin: { type: String },
        portfolio: { type: String },
    },
    education: [{
        institution: { type: String, required: true },
        degree: { type: String, required: true },
        year: { type: String, required: true },
    }],
    experience: [{
        company: { type: String },
        position: { type: String },
        startDate: { type: String },
        endDate: { type: String },
        description: { type: String }
    }],
    skills: [{ type: String }],
    certifications: [{
        name: { type: String },
        year: { type: String },
        organization: { type: String },
    }],
    projects: [{
        name: { type: String },
        description: { type: String },
        date: { type: String } 
    }],
    summary: { type: String } 

}, { versionKey: false });

const ResumeModel = mongoose.model('resume', resumeSchema);

module.exports = ResumeModel;
