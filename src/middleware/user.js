const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Session = require('../models/session');

const user = async (req, res, next) => {
    try {
        // const token = req.header('Authorization').replace('Bearer ','');
        const session = await Session.findOne({ 'session_id': req.sessionID });
        
        const token = session.token;
        
        const decoded = jwt.verify(token, 'my_jwt_secret');   
                
        //find a user with the correct id, who has an authentication token still stored
        // 'tokens.token' means it will look inside the array of tokens to check if the token above matches 
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        //pass the user and token to the routers, so they do not need to fetch it again
        req.token = token;
        res.locals.user = user;
        next();
    } catch (e) {
        // res.render('login');
        // res.status(401).send({error: 'No active user found.'});
        next();
    }
};

module.exports = user;