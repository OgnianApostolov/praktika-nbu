const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    session_id: {
        type: String,
        required: true
    },
    token: {
        type: String
    }
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;