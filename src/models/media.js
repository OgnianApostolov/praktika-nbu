const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    file: {
        type: Buffer
    },
    alt: {
        type: String
    },
    filename: {
        type: String
    }
},{
    timestamps: true
});
const Media = mongoose.model('Media', mediaSchema);

module.exports = Media;