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
        type: String,
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

    timings: {
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
        }
    },

    availability: {
        type: Boolean,
        default: true
    },

    profilePicture: {
        type: String,
    },

}, {timestamps: true}
)

const DoctorInfo = mongoose.model('DoctorInfo', doctorSchema);

export default DoctorInfo;