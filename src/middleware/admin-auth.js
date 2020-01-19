const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Session = require('../models/session');

const auth = async (req, res, next) => {
    try {
        // const token = req.header('Authorization').replace('Bearer ','');
        const session = await Session.findOne({ 'session_id': req.sessionID });
        const token = session.token;
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);   
                
        //find a user with the correct id, who has an authentication token still stored
        // 'tokens.token' means it will look inside the array of tokens to check if the token above matches 
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        
        if(!user || !user.isAdmin){
            throw new Error();
        }
        //pass the user and token to the routers, so they do not need to fetch it again
        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.render('login');
        // res.status(401).send({error: 'Please authenticate.'});
    }
};

module.exports = auth;