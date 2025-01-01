import mongoose, { Schema } from 'mongoose';


const patientSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true
    },

    contactNumber: {
        type: Number,
        required: true
    },
    medicalHistory: [
        {
            type: String
        }
    ]

}, {timestamps: true}
)

const PatientInfo = mongoose.model('PatientInfo', patientSchema);

export default PatientInfo;