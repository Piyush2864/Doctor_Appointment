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