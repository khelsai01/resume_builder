const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    personalInfo: {
        name: { type: String, required: true },
        email:{ type: String, required: true },
        phone: { type: String, required: true },
        // image:{ type: String, required: true }
        
    },
    education: [{
        institution: { type: String, required: true },
        degree: { type: String, required: true },
        year:{ type: String, required: true },
    }],
    experience: [{
        company: String,
        position: String,
        start: Date,
        end: Date,
        description: String
    }],
    skills: [String],

}, { versionKey: false });

const ResumeModel = mongoose.model('resume', resumeSchema);

module.exports = ResumeModel;