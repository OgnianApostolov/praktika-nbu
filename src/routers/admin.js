const express = require('express');

const Doctor = require('../models/doctor');
const Media = require('../models/media');

const router = new express.Router();


router.get('/admin-doctors', async (req, res) => {
    try {
        const doctors = await Doctor.find({}).sort({'createdAt': 'descending'});      
        const medias = await Media.find({}).sort({'createdAt': 'descending'});

        res.render('admin/admin_doctors', {
            title: 'admin-doctors',
            doctors,
            medias
        });
    } catch (error) {
        res.status(500).send(error);        
    }
});

router.get('/admin-doctor', async (req, res) => {
    try {       
        const doctor = await Doctor.findById(req.query.id);      
        const medias = await Media.find({}).sort({'createdAt': 'descending'});

        res.render('admin/admin_doctor', {
            title: 'admin-doctor',
            doctor,
            medias
        });
    } catch (error) {
        res.status(500).send(error);        
    }
});

module.exports = router;