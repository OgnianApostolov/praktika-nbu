const express = require('express');

const Doctor = require('../models/doctor');
const User = require('../models/user');
const Media = require('../models/media');
const admin_auth = require('../middleware/admin-auth');

const router = new express.Router();

router.get('/admin-media', admin_auth, async (req, res) => {
    try {
        const medias = await Media.find({}).sort({'createdAt': 'descending'});
        
        res.render('admin/admin_media', {
            title: 'admin-media',
            medias
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

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

router.get('/admin-users', async (req, res) => {
    try {
        const users = await User.find({}).sort({'createdAt': 'descending'});      
        const medias = await Media.find({}).sort({'createdAt': 'descending'});

        res.render('admin/admin_users', {
            title: 'admin-users',
            users,
            medias
        });
    } catch (error) {
        res.status(500).send(error);        
    }
});

router.get('/admin-user', async (req, res) => {
    try {       
        const user = await User.findById(req.query.id);      
        const medias = await Media.find({}).sort({'createdAt': 'descending'});

        res.render('admin/admin_user', {
            title: 'admin-user',
            user,
            medias
        });
    } catch (error) {
        res.status(500).send(error);        
    }
});

module.exports = router;