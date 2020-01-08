const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    date: {
		type: Date,
		unique: true,
		required: true
    },
	doctor: {
		type:mongoose.Schema.Types.ObjectId,
        ref:'Doctor',
		required: true
	},
	client: {
		type:mongoose.Schema.Types.ObjectId,
        ref:'User',
		required: true
	}
}, {
    timestamps: true
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;