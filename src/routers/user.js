const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/user');
const Media = require('../models/media');
const auth = require('../middleware/auth');
const user = require('../middleware/user');
const Session = require('../models/session');
const { sendWelcomeEmail, sendCancelationEmail, sendConfirmationEmail, sendPasswordResetEmail, sendResetPasswordEmail } = require('../emails/account');
const router = new express.Router();

// create user
router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        sendConfirmationEmail(user.email, user.firstName);
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// login a user
router.post('/users/login', async (req, res) => {    
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);

        console.log(user);
        
        const token = await user.generateAuthToken();

        const session = new Session({session_id: req.sessionID, token});
        
        await session.save();

        res.send({ user, token });
    } catch (error) {             
        console.log(error);
          
        res.status(400).send(error.message);
    }
});

// logout a user
router.post('/users/logout', auth, async (req, res) => {
    try {
        // delete the authentication token from the user
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });

        await req.user.save();

        res.send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// logout all user tokens
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];

        await req.user.save;

        res.send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// get a user's profile
router.get('/users/me', user, auth, async (req, res) => {
    console.log(req.user);
    
    res.render('user', {
        user: req.user
    });
    // res.send(req.user);
});

router.get('/users/:id', auth, async (req, res) => {
    const user = await User.find(req.params.id);
    res.send(user);
});

// update a user
router.patch('/users/:id', async(req, res) => {
    const user = await User.findById(req.params.id);
    //return message for invalid updates
    const updates = Object.keys(req.body);
    const allowed_updates = ['ambulatory_list', 'upvotes', 'downvotes', 'blacklist' ];
    //cycle trough the updates array and if it returns false - return
    const isValidOperation = updates.every((update) => allowed_updates.includes(update));
    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'});
    }

    try {
        updates.forEach((update) => user[update] = req.body[update]);

        await user.save();
        
        res.send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});


// update a user
router.patch('/users/me', auth, async(req, res) => {
    //return message for invalid updates
    const updates = Object.keys(req.body);
    const allowed_updates = ['firstname', 'lastname', 'email', 'password', 'avatar', 'isAdmin', 'isStaff', 'isConfirmed', 'ambulatory_list', 'upvotes', 'downvotes', 'blacklist' ];
    //cycle trough the updates array and if it returns false - return
    const isValidOperation = updates.every((update) => allowed_updates.includes(update));
    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'});
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update]);

        await req.user.save();
        
        res.send(req.user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// delete user
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        sendCancelationEmail(req.user.email, req.user.firstName);
        res.send(req.user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/users/upvote/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);

        if(!user){
            return res.status(404).send();
        }

        user.upvotes ++;
        await user.save();

        res.redirect('/admin-users');
        // res.send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// get a particular user
router.get('/users/downvote/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);

        if(!user){
            return res.status(404).send();
        }

        user.downvotes ++;
        await user.save();

        res.redirect('/admin-users');

        // res.send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.get('/signup', user, async (req, res) => {
    res.render('signup', {
        title: 'sign up'
    });
});

// router.get('/account-confirmation', user, async (req, res) => {
//     res.render('account_confirmation', {
//         title: 'account-confirmation'
//     });
// });

// confirm account
router.get('/users/confirm/:email', async(req, res) => {
    try {
        const user = await User.findOne({'email': req.params.email});
        
        user.isConfirmed = true;
        await user.save();
        sendWelcomeEmail(user.email, user.firstName);
        const token = await user.generateAuthToken();
        res.redirect('/users/me').send({ user, token });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get('/password-reset', user, async (req, res) => {
    res.render('password_reset', {
        title: 'password-reset'
    });
});

// reset password account
router.get('/users/send-password-reset/:email', async(req, res) => {
    try {
        const user = await User.findOne({'email': req.params.email});
        if(!user){
            return res.status(400).send({error: 'Invalid user!'});
        }
        
        sendPasswordResetEmail(user.email, user.firstName);
        res.status(201).send();
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get('/reset-password/:email', user, async (req, res) => {
    res.render('reset_password', {
        title: 'reset-password',
        email: req.params.email
    });
});

router.patch('/change-password/:email', async (req, res) => {
    
    try {
        const user = await User.findOne({'email': req.params.email});
        if(!user){
            return res.status(400).send({error: 'Invalid user!'});
        }
        user.password = req.body.password;
        await user.save();
        sendResetPasswordEmail(user.email, user.firstName);
        res.status(201).send();
    } catch (error) {
        res.status(400).send(error.message);
    }
});

//upload/delete/get user avatar
const upload = multer({
    limits: {
        fileSize: 5000000
    },
    fileFilter(req, file, callback){
        if(!file.originalname.match(/\.(JPG|jpg|jpeg|png)$/)){
            callback(new Error('.' + file.originalname.split('.')[1] + ' is not a supported extension.'));
        }
        callback(undefined, true);
    }
});

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {  
    const buffer = await sharp(req.file.buffer).png().toBuffer();
    
    if(!req.user){
        return res.status(404).send();
    }
        
    const media = new Media();
    media.file = buffer;
    media.filename = req.file.originalname;
    media.alt = req.body.alt;
    await media.save();

    req.user.avatar = media.id;
    await req.user.save();
    res.redirect('/users/me');
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});

router.get('/users/me/avatar',auth, async (req, res) => {
    
    try {
        if(!req.user || !req.user.avatar){
            throw new Error();
        }
        
        const media = await Media.findById(req.user.avatar._id);
        
        res.set('Content-Type', 'image/png');
        res.send(media.file);
    } catch (error) {
        res.status(404).send();
    }
});

router.delete('/users/me/avatar', auth, async (req, res) => {
    await Media.findByIdAndDelete(req.user.avatar.id);
    
    req.user.avatar = undefined;
    await req.user.save();

    res.send();
});

module.exports = router;