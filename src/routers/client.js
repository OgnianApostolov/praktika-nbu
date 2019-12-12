const express = require('express');
const Client = require('../models/client');
const auth = require('../middleware/auth');
const router = new express.Router();

// create client
router.post('/clients', async (req, res) => {
    const client = new Client(req.body);

    try {
        await client.save();
        res.status(201).send();
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// get all clients
router.get('/clients', async (req, res) => {
    try {
        const clients = await Client.find({});
        res.send(clients);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// get a particular client
router.get('/clients/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const client = await Client.findById(_id);

        if(!client){
            return res.status(404).send();
        }
        res.send(client);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// update client by id
router.patch('/clients/:id', async (req, res) => {
    
    const updates = Object.keys(req.body);
    console.log(updates);
    const allowedUpdates = ['name', 'type', 'city', 'rating', 'rating', 'workhours', 'notes', 'blacklist'];
    const isValidOperation = updates.every((update => allowedUpdates.includes(update)));

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates' });
    }

    try {
        const _id = req.params.id;
        const client = await Client.findById(_id);

        if(!client){
            return res.status(404).send();
        }

        updates.forEach((update) => client[update] = req.body[update]);
        await client.save();
        res.send(client);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// delete client
router.delete('/clients/:id', async (req, res) => {
    try {        
        const _id = req.params.id;
        const client = await Client.findByIdAndDelete(_id);

        if(!client){
            return res.status(404).send();
        }

        res.send(client);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;