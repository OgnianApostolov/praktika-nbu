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
    rating: {
        type: Number
    },
    workhours: {
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
        }
    },
    notes: {
        type: String
    },
    blacklist: [{
        type: mongoose.Schema.Types.ObjectId
    }]
}, {
    timestamps: true
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;