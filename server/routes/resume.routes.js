const express = require('express');
const ResumeModel = require('../models/resume.model');


const resumeRouter = express.Router();

resumeRouter.post('/create', async (req, res) => {
    
    try {

        const newResume = new ResumeModel(req.body);

        await newResume.save();
        res.status(200).send({ 'message': 'new resume created', 'resume': newResume })
        
    } catch (error) {
        res.status(500).send({ 'message': error.message })
    }
});

resumeRouter.get('/all', async (req, res) => {
    try {
        
        const resumes = await ResumeModel.find();
        res.status(200).send({ 'message': 'resumes fetched', 'resumes': resumes });

    } catch (error) {
        res.status(500).send({ 'message': error.message })
        
    }
});

resumeRouter.get('/:id', async (req, res) => {

    const { id } = req.params;

    try {
    
        const resume = await ResumeModel.findById({ _id: id });

        if (!resume) {
            res.status(404).send({ 'message': 'resume not found' });
        }
        res.status(200).send({ 'resume': resume });

    } catch (error) {
        res.status(500).send({ 'message': error.message })
        
    }
});

resumeRouter.patch('/:id', async (req, res) => {

    const { id } = req.params;

    try {
    
        const resume = await ResumeModel.findByIdAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true
        });

        if (!resume) {
            res.status(404).send({ 'message': 'resume not found' });
        }
        res.status(200).send({ 'resume': resume });

    } catch (error) {
        res.status(500).send({ 'message': error.message })
        
    }
});

resumeRouter.delete('/:id', async (req, res) => {

    const { id } = req.params;

    try {
    
        const resume = await ResumeModel.findByIdAndDelete({ _id: id });

        if (!resume) {
            res.status(404).send({ 'message': 'resume not found' });
        }
        res.status(200).send({ 'message': `resume of Id ${id} has been deleted` });

    } catch (error) {
        res.status(500).send({ 'message': error.message })
        
    }
});


module.exports = resumeRouter;