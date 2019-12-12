const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    ambulatory_list: {
        type: String
    },
    rating: {
        type: Number
    },
    blacklist: [{
        type: mongoose.Schema.Types.ObjectId
    }]
}, {
    timestamps: true
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;