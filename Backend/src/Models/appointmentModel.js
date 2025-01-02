import mongoose, { Schema } from 'mongoose';


const appointmentSchema = new Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DoctorInfo",
        required: true
    },

    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PatientInfo",
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    timeSlot: { 
        type: String,
        required: true 
    }, // E.g., 10:00 AM - 11:00 AM

    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
        default: 'Pending'
    },

    reasonForVisit: {
        type: String
    },

}, {timestamps: true}
)

const AppointmentInfo = mongoose.model("AppointmentInfo", appointmentSchema);

export default AppointmentInfo;