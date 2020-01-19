const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String
    },
    city: {
        type: String
    },
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
    monday: {
        active: {
            type: Boolean,
            default: false
        },
        hours: [{
            start: {
                type: String
            },
            end: {
                type: String
            }
        }]
    },
    tuesday: {
        active: {
            type: Boolean,
            default: false
        },
        hours: [{
            start: {
                type: String
            },
            end: {
                type: String
            }
        }]
    },
    wednesday: {
        active: {
            type: Boolean,
            default: false
        },
        hours: [{
            start: {
                type: String
            },
            end: {
                type: String
            }
        }]
    },
    thursday: {
        active: {
            type: Boolean,
            default: false
        },
        hours: [{
            start: {
                type: String
            },
            end: {
                type: String
            }
        }]
    },
    friday: {
        active: {
            type: Boolean,
            default: false
        },
        hours: [{
            start: {
                type: String
            },
            end: {
                type: String
            }
        }]
    },
    saturday: {
        active: {
            type: Boolean,
            default: false
        },
        hours: [{
            start: {
                type: String
            },
            end: {
                type: String
            }
        }]
    },
    sunday: {
        active: {
            type: Boolean,
            default: false
        },
        hours: [{
            start: {
                type: String
            },
            end: {
                type: String
            }
        }]
    },
    notes: {
        type: String
    },
    medias: [{
        media: {
            type: mongoose.Schema.Types.ObjectId
        }
    }],
    blacklist: [{
        type: mongoose.Schema.Types.ObjectId
    }],
    comments: [{
        comment: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    }],
}, {
        timestamps: true
    });

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;