const express = require('express');
const ResumeModel = require('../models/resume.model');

const resumeRouter = express.Router();

resumeRouter.post('/create', async (req, res) => {
    try {
        const newResume = new ResumeModel(req.body);
        await newResume.save();
        res.status(200).send({ 'message': 'new resume created', 'resume': newResume });
    } catch (error) {
        res.status(500).send({ 'message': error.message });
    }
});

resumeRouter.get('/all', async (req, res) => {
    const userId = req.body.userId; 
    try {
        if (!userId) {
            return res.status(400).send({ 'message': 'userId is required' });
        }
        const resumes = await ResumeModel.find({ userId: userId });
        res.status(200).send({ 'message': 'resumes fetched', 'resumes': resumes });
    } catch (error) {
        res.status(500).send({ 'message': error.message });
    }
});

resumeRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const userId = req.body.userId;
    try {
        const resume = await ResumeModel.findById(id);
        if (!resume) {
            return res.status(404).send({ 'message': 'resume not found' });
        }
        if (resume.userId !== userId) {
            return res.status(403).send({ 'message': 'You are not authorized to view this resume' });
        }
        res.status(200).send({ 'resume': resume });
    } catch (error) {
        res.status(500).send({ 'message': error.message });
    }
});

resumeRouter.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const userId = req.body.userId;
    try {
        const resume = await ResumeModel.findById(id);
        if (!resume) {
            return res.status(404).send({ 'message': 'resume not found' });
        }
        if (resume.userId !== userId) {
            return res.status(403).send({ 'message': 'You are not authorized to edit this resume' });
        }
        const updatedResume = await ResumeModel.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).send({ 'resume': updatedResume });
    } catch (error) {
        res.status(500).send({ 'message': error.message });
    }
});

resumeRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const userId = req.body.userId;
    try {
        const resume = await ResumeModel.findById(id);
        if (!resume) {
            return res.status(404).send({ 'message': 'resume not found' });
        }
        if (resume.userId !== userId) {
            return res.status(403).send({ 'message': 'You are not authorized to delete this resume' });
        }
        await ResumeModel.findByIdAndDelete(id);
        res.status(200).send({ 'message': `resume of Id ${id} has been deleted` });
    } catch (error) {
        res.status(500).send({ 'message': error.message });
    }
});

module.exports = resumeRouter;
