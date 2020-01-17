const express = require('express');
const Appointment = require('../models/appointment');
const auth = require('../middleware/auth');
const { notifyAppointmentEmail } = require('../emails/appointment');
const router = new express.Router();

// create appointment
router.post('/appointments', auth, async (req, res) => {
    const appointment = new Appointment(req.body);

    try {
        await appointment.save();
        notifyAppointmentEmail(user.email, user.firstName);
        res.status(201).send();
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// get all appointments
router.get('/appointments', auth, async (req, res) => {
    try {
        const appointments = await Appointment.find({});
        res.send(appointments);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// get a particular appointment
router.get('/appointments/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const appointment = await Appointment.findById(_id);

        if(!appointment){
            return res.status(404).send();
        }
        res.send(appointment);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/appointments/:doctor_id/:user_id/:date', async (req, res) => {
    const doctor_id = req.params.doctor_id;
    const user_id = req.params.user_id;
    const date = req.params.date;
    try {
        const appointment = await Appointment.findById(_id);

        if(!appointment){
            return res.status(404).send();
        }
        res.send(appointment);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// update appointment by id
router.patch('/appointments/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'venue', 'city', 'address', 'contact', 'brands'];
    const isValidOperation = updates.every((update => allowedUpdates.includes(update)));

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates' });
    }

    try {
        const _id = req.params.id;
        const appointment = await Appointment.findById(_id);

        if(!appointment){
            return res.status(404).send();
        }

        updates.forEach((update) => appointment[update] = req.body[update]);
        await appointment.save();
        res.send(appointment);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// delete appointment
router.delete('/appointments/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id;
        const appointment = await Appointment.findByIdAndDelete(_id);

        if(!appointment){
            return res.status(404).send();
        }

        res.send(appointment);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;