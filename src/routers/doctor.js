const express = require('express');
const Doctor = require('../models/doctor');
const User = require('../models/user');
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
        res.render('doctors', {
            title: 'doctors',
            doctors
        });
        // res.send(doctors);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// get a particular doctor
router.get('/doctors/:id', auth, async (req, res) => {
    const _id = req.params.id;
    
    try {
        
        var doctor = await Doctor.findById(_id);      
        for (let i = 0; i < doctor.comments.length; i++) {
            const current = doctor.comments[i];
            const user = await User.findById(current.user);
            doctor.comments[i].name = user.firstName + user.lastName;
        }          
        if(!doctor){
            return res.status(404).send();
        }
        res.render('doctor', {
            doctor,
            user: req.user
        })
    } catch (error) {
        console.log(error);
        
        res.status(500).send(error.message);
    }
});

router.get('/upvote/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const doctor = await Doctor.findById(_id);

        if(!doctor){
            return res.status(404).send();
        }

        doctor.upvotes ++;
        await doctor.save();

        res.render('feedback', {
            doctor
        })
        // res.send(doctor);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// get a particular doctor
router.get('/downvote/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const doctor = await Doctor.findById(_id);

        if(!doctor){
            return res.status(404).send();
        }

        doctor.downvotes ++;
        await doctor.save();

        res.render('feedback', {
            doctor
        })
        // res.send(doctor);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//get the doctors-rating page
router.get('/doctors/rating/:id', async (req, res) => {	
	const _doctorId = req.params.id;
			
	try {		
		const doctor = await Doctor.findById(_doctorId);
		
		if(!doctor) {			
            return res.status(400).send({error: 'Invalid doctor!'});
		}
		
		res.render('doctor-rating', {doctor: doctor});
	}
	catch (error) {		
		res.status(500).send(error.message);
	}	
});

//updates the doctors rating
//parameters:
//id - the doctor ObjectId
//rating - the number of stars the doctor has been rated
router.post('/doctors/rating', async (req, res) => {
	const _id = req.body.id;
	const _userRating = req.body.rating;
	
	try {
		const doctor = await Doctor.findById(_id);
		
		if(!doctor) {
			return res.status(400).send({error: 'Invalid doctor!'});
		}
		
		if(isNaN(_userRating) || !(_userRating > 0 && _userRating <= 5)) {
			return res.status(400).send({error: 'Invalid rating!'})
		}
		
		let newTotalRates = doctor.totalRates + 1;
		let newRating = ((doctor.rating * doctor.totalRates) + _userRating)/newTotalRates;
		
		await Doctor.update({id: _id}, {$set : {rating : newRating, totalRates: newTotalRates}});
		
		res.status(200).send({rating: newRating});		
	}
	catch(error) {
		res.status(500).send(error.message);	
	}
});

// update doctor by id
router.patch('/doctors/:id', async (req, res) => {    
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'type', 'city', 'upvotes', 'downvotes', 'notes', 'blacklist', 'medias', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
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

// update doctor by id
router.patch('/doctors/comment/:id', auth, async (req, res) => {
    try{
        const doctor = await Doctor.findById(req.params.id);
        doctor.comments.push({user: req.user, comment: req.body.comment});
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