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
        type: String,
        required: true
    },

    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true
    },

    contactNumber: {
        type: String,
        required: true
    },

    profilePicture: {
        type: String
    },

    medicalHistory: [
        {
            condition: { type: String },  // Condition/diagnosis e.g., "Headache"
            treatment: { type: String },  // Treatment given or prescribed
            visitDate: { type: Date },    // Date when the condition was noted
            reasonForVisit: { type: String } // Reason for this consultation
        }
    ],

    
    // preferredConsultationMode: {
    //     type: String,
    //     enum: ['Video', 'In-person'],
    //     default: 'In-person'
    // },

    
    videoCallNotifications: {
        type: Boolean,
        default: true
    },

    
    videoCallHistory: [
        {
            doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'DoctorInfo' },
            appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
            date: { type: Date },
            platform: { type: String, default: 'WebRTC' },  // WebRTC or other platform
            roomId: { type: String }  // Unique ID for video call room
        }
    ]
    
}, { timestamps: true });

const PatientInfo = mongoose.model('PatientInfo', patientSchema);

export default PatientInfo;
