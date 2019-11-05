const express = require('express');
const Session = require('../models/session');
const auth = require('../middleware/auth');
const router = new express.Router();

// create session
router.post('/sessions', auth, async (req, res) => {
    const session = new Session(req.body);

    try {
        await session.save();
        res.status(201).send();
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// get all sessions
router.get('/sessions', auth, async (req, res) => {
    try {
        const sessions = await Session.find({});
        res.send(sessions);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// get a particular session
router.get('/sessions/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const session = await Session.findById(_id);

        if(!session){
            return res.status(404).send();
        }
        res.send(session);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// update session by id
router.patch('/sessions/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'venue', 'city', 'address', 'contact', 'brands'];
    const isValidOperation = updates.every((update => allowedUpdates.includes(update)));

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates' });
    }

    try {
        const _id = req.params.id;
        const session = await Session.findById(_id);

        if(!session){
            return res.status(404).send();
        }

        updates.forEach((update) => session[update] = req.body[update]);
        await session.save();
        res.send(session);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// delete session
router.delete('/sessions/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id;
        const session = await Session.findByIdAndDelete(_id);

        if(!session){
            return res.status(404).send();
        }

        res.send(session);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;