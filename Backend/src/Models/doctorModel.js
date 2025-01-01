import mongoose, { Schema } from 'mongoose';

const doctorSchema = new Schema({
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

    specialization: {
        type: [String], // Array to allow multiple specializations
        required: true
    },

    description: {
        type: String,
        required: true
    },

    experience: {
        type: String,
        required: true
    },

    contactNumber: {
        type: String,
        required: true
    },

    timings: [
        {
            day: {
                type: String,
                enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                required: true
            },
            startTime: {
                type: String,
                required: true
            },
            endTime: {
                type: String,
                required: true
            }
        }
    ],

    availability: {
        type: Boolean,
        default: true
    },

    clinicAddress: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    profilePicture: {
        type: String,
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    }

}, {timestamps: true});

const DoctorInfo = mongoose.model('DoctorInfo', doctorSchema);

export default DoctorInfo;
