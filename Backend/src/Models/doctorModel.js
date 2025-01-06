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

    videoConsultationTimings: [
        {
            day: {
                type: String,
                enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                
            },
            timings: [
                {
                    startTime: {
                        type: String,
                         // e.g., "01:00 PM"
                    },
                    endTime: {
                        type: String,
                         // e.g., "02:00 PM"
                    },
                    slotDuration: {
                        type: Number, // Duration in minutes
                         // e.g., 20
                    }
                }
            ]
        }
    ],

    availability: {
        type: Boolean,
        default: true
    },

    videoCallDetails: {
        type: Object,
        default: {
            platform: "WebRTC",
            roomId: null
        }
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

    // isVerified: {
    //     type: Boolean,
    //     default: false
    // },

    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },

    fees: {
        type: String,
        required: true
    },

    ratings: {
        type: Number,
        default: 0
    },

    reviews: [
        {
            patientId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "PatientInfo"
            },
            review: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            }
        }
    ],

    maxVideoConsultationsPerDay: {
        type: Number,
        default: 10
    },

    // emergencyAvailability: {
    //     type: Boolean,
    //     default: false
    // }

}, { timestamps: true });

const DoctorInfo = mongoose.model('DoctorInfo', doctorSchema);

export default DoctorInfo;
