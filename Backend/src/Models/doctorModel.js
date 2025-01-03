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
        type: [String], 
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

    shifts: [
        {
            day: {
                type: String,
                enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                required: true
            },
            timings: [
                {
                    startTime: {
                        type: String,
                        required: true // e.g., "09:00 AM"
                    },
                    endTime: {
                        type: String,
                        required: true // e.g., "12:00 PM"
                    },
                    slotDuration: {
                        type: Number, // Duration in minutes
                        required: true // e.g., 30
                    }
                }
            ]
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
        type: String
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },

    fees: {
        type: String,
        required: true
    }

}, { timestamps: true });

const DoctorInfo = mongoose.model('DoctorInfo', doctorSchema);

export default DoctorInfo;
