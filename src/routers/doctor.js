const express = require('express');
const Doctor = require('../models/doctor');
const auth = require('../middleware/auth');
const router = new express.Router();

// create doctor
router.post('/doctors', async (req, res) => {
    const doctor = new Doctor(req.body);

    try {
        await doctor.save();
        res.status(201).send();
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// get all doctors
router.get('/doctors', async (req, res) => {
    try {
        const doctors = await Doctor.find({});
        res.send(doctors);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// get a particular doctor
router.get('/doctors/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const doctor = await Doctor.findById(_id);

        if(!doctor){
            return res.status(404).send();
        }
        res.send(doctor);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// update doctor by id
router.patch('/doctors/:id', async (req, res) => {
    
    const updates = Object.keys(req.body);
    console.log(updates);
    const allowedUpdates = ['name', 'type', 'city', 'rating', 'rating', 'workhours', 'notes', 'blacklist'];
    const isValidOperation = updates.every((update => allowedUpdates.includes(update)));

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates' });
    }

    try {
        const _id = req.params.id;
        const doctor = await Doctor.findById(_id);

        if(!doctor){
            return res.status(404).send();
        }

        updates.forEach((update) => doctor[update] = req.body[update]);
        await doctor.save();
        res.send(doctor);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// delete doctor
router.delete('/doctors/:id', async (req, res) => {
    try {        
        const _id = req.params.id;
        const doctor = await Doctor.findByIdAndDelete(_id);

        if(!doctor){
            return res.status(404).send();
        }

        res.send(doctor);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;