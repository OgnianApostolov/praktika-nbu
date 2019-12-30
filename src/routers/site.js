const express = require('express');
const user = require('../middleware/user');

const router = new express.Router();

router.get('', user, async (req, res) => {
    res.render('index', {
        title: 'home'
    });
});

// router.get('/doctors', user, async (req, res) => {
//     res.render('doctors', {
//         title: 'doctors'
//     });
// });


router.get('/doctor-rating', user, async (req, res) => {
    res.render('doctor-rating', {
        title: 'doctor-rating'
    });
});

module.exports = router;