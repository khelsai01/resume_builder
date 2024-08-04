const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    personalInfo: {
        name: { type: String, required: true },
        email:{ type: String, required: true },
        phone: { type: String, required: true },
        // image:{ type: String, required: true }
        address: { type: String, required: true },
        linkedin: { type: String },
        portfolio: { type: String },
        
        
    },
    education: [{
        institution: { type: String, required: true },
        degree: { type: String, required: true },
        year:{ type: String, required: true },
    }],
    experience: [{
        company: String,
        position: String,
        startDate: Date,
        endDate: Date,
        description: String
    }],
    skills: [String],
    certifications: [{
        name: String,
        year: Date,
        organization: String,
        
    }],
    projects: [{
        name: String,
        description: String,
        data: Date
    }],
    summary:""

}, { versionKey: false });

const ResumeModel = mongoose.model('resume', resumeSchema);

module.exports = ResumeModel;