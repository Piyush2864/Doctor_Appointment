import mongoose, { Schema } from 'mongoose';


const adminSchema = new Schema({
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

    role: {
        type: String,
        default: 'admin'
    }

}, {timestamps: true}
);

const AdminInfo = mongoose.model("AdminInfo", adminSchema);

export default AdminInfo;