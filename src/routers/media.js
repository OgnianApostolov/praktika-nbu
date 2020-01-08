const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const Media = require('../models/media');
const router = new express.Router();

//upload/delete/get collection media
const upload = multer({
    limits: {
        fileSize: 5000000
    },
    fileFilter(req, file, callback){
        if(!file.originalname.match(/\.(JPEG|JPG|jpg|jpeg|png)$/)){
            callback(new Error('.' + file.originalname.split('.')[1] + ' is not a supported extension.'));
        }
        callback(undefined, true);
    }
});

router.post('/medias', upload.single('media'), async (req, res) => {
    try {       
        const buffer = await sharp(req.file.buffer).png().toBuffer();
        
        const media = new Media();
        media.file = buffer;
        media.filename = req.file.originalname;
        media.alt = req.body.alt;
        await media.save();
        res.redirect('/admin-media');
        
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.get('/medias/:id', async (req, res) => {
    try {        
        const media = await Media.findById(req.params.id);
        
        res.set('Content-Type', 'image/png');
        res.send(media.file);
    } catch (error) {        
        res.status(404).send();
    }
});

router.delete('/medias/:id', async (req, res) => {
    try {
        await Media.findByIdAndDelete( req.params.id );
        res.send();
    } catch (error) {
        res.status(404).send();
    }
});

module.exports = router;