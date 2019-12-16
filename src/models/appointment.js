const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    date: [{
        type: Date
    },
	comments: [
		comment: {
			type: String
		}
	],
	isConfirmedByDoctor: {
		type: Boolean,
		default: false,
		required: true
	},
	doctor: {
		type:mongoose.Schema.Types.ObjectId,
        ref:'Doctor',
		required: true
	},
	client: {
		type:mongoose.Schema.Types.ObjectId,
        ref:'Client',
		required: true
	}]
}, {
    timestamps: true
});

userSchema.statics.findByDoctorName = async (name) => {
    
    const appointment = await Doctor.findOne({ name });

    if(!appointment){
		
        throw new Error('No appointments found for doctor: ' + name);
    }

    return appointment;
};

userSchema.statics.findByClientName = async (name) => {
    
    const appointment = await Client.findOne({ name });

    if(!appointment){
        throw new Error('No appointments found for client: ' + name);
    }

    return appointment;
};

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;