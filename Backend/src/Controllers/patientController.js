import PatientInfo from '../Models/patientModel.js';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

export const registerPatientController = async (req, res) => {
    try {
        const { name, email, password, age, gender, contactNumber } = req.body;
        console.log("Received data:", req.body);

        const profilePicture = req.file ? req.file.path : null;

        // ✅ Validate Required Fields
        if (!name || !email || !password || !age || !gender || !contactNumber) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!",
            });
        }

        // ✅ Check if Patient Already Exists
        const existingPatient = await PatientInfo.findOne({ email });
        if (existingPatient) {
            return res.status(400).json({
                success: false,
                message: 'Patient already exists!',
            });
        }

        // ✅ Corrected Password Validation
        if (!password) { // ❌ Previously, it was checking "if (password)" incorrectly
            return res.status(400).json({
                success: false,
                message: "Password is required!",
            });
        }

        // ✅ Hash Password
        const hashedPassword = await bcrypt.hash(password, 10); // ✅ Ensure password is valid

        // ✅ Create New Patient Record
        const patient = new PatientInfo({
            name,
            email,
            password: hashedPassword, // ✅ Store hashed password
            age,
            gender,
            contactNumber,
            profilePicture
        });

        await patient.save();

        return res.status(201).json({
            success: true,
            message: 'Patient registered successfully.',
            data: patient
        });
    } catch (error) {
        console.error('Error registering patient:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};



export const loginPatientController = async(req, res)=> {
    const { email, password } = req.body;

    try {
        const patient = await PatientInfo.findOne({ email });
        if(!patient){
            return res.status(404).json({
                success: false,
                message: 'Patient not found.'
            });
        }

        const isMatch = await bcrypt.compare(password, patient.password);
        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials.'
            });
        }
        const secretkey = process.env.JWT_SECRET || 'Piyush123'
        const token = JWT.sign({id: patient._id, role: 'Patient'}, secretkey, { expiresIn: "1d"});

        return res.status(200).json({
            success: true,
            message: 'Login successfully.',
            token,
            data: patient
        });
    } catch (error) {
        console.error('Error logging patient.:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};


export const getAllPatientController = async(req, res)=> {
    try {
        const patients = await PatientInfo.find({}, '-password');
        if(!patients) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Patients fatched successfully.',
            data: patients
        });
    } catch (error) {
        console.error('Error fetching patient.:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};


export const getPatientByIdController = async(req, res)=>{
    const { id } = req.params;

    try {
        const patient = await PatientInfo.findById(id, '-password');
        if(!patient){
            return res.status(404).json({
                success: false,
                message: 'Patient not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: "Patient fatched successfully.",
            data: patient
        })
    } catch (error) {
        console.error('Error fetching patient.:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};


export const updatePatientController = async(req, res)=> {
    const { id } = req.params;
    const updates = req.body;

    try {
        const patient = await PatientInfo.findByIdAndUpdate(id, updates, {new: true, runValidators: true});
        if(!patient){
            return res.status(404).json({
                success: false,
                message: 'Patient not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Patient profile updated successfully.',
            data: patient
        });
    } catch (error) {
        console.error('Error updating profile of patient.:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};


export const deletePatientController = async(req, res)=> {
    const { id } = req.params;
    try {
        const patient = await PatientInfo.findByIdAndDelete(id);
        if(!patient) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Patient deleted successfully.'
        });
    } catch (error) {
        console.error('Error deleting patient.:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};


// export const getPatientMedicalHistoryController = async(req, res)=> {
//     const { id } = req.params;
//     try {
//         const patient = await PatientInfo.findById(id);
//         if(!patient){
//             return res.status(404).json({
//                 success: false,
//                 message: 'Patient not found.'
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             messaeg: 'Medical history fetched successfully.',
//             data: patient
//         })
//     } catch (error) {
//         console.error('Error fetching medical history of patient.:', error);
//         return res.status(500).json({
//             success: false,
//             message: 'Server error.'
//         });
//     }
// };


export const addAppointmentToHistoryController = async(req, res) => {
    const { patientId, appointmentDetails } = req.body;

    try {
        const patient = await PatientInfo.findById(patientId);
        if(!patient) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found.'
            });
        }

        // Medical History mein appointment add karna
        patient.medicalHistory.push({
            condition: appointmentDetails.condition, 
            treatment: appointmentDetails.treatment, 
            visitDate: new Date(), 
            reasonForVisit: appointmentDetails.reasonForVisit
        });

        await patient.save();

        return res.status(200).json({
            success: true,
            message: 'Appointment added to medical history.',
            data: patient
        });
    } catch (error) {
        console.error('Error updating patient medical history.', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};




export const getPatientHistoryController = async(req, res)=> {
    const { patientId } = req.params;

    try {
        const patient = await PatientInfo.findById(patientId);
        if(!patient) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Patient history fetched successfully.',
            data: patient
        });
    } catch (error) {
        console.error('Error fetching patient history.', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
}


export const addVideoCallToHistoryController = async (req, res) => {
    const { patientId, doctorId, appointmentId, date, platform, roomId } = req.body;

    try {
        const patient = await PatientInfo.findById(patientId);
        if(!patient){
            return res.status(404).json({
                success: false,
                message: 'Patient not found.'
            });
        }

        // Video call ko history mein add karna
        patient.videoCallHistory.push({
            doctorId,
            appointmentId,
            date,
            platform,  // Example: "Zoom", "WebRTC", etc.
            roomId      // Unique roomId for the call
        });

        // Medical history mein bhi update karna
        patient.medicalHistory.push({
            condition: 'Follow-up Consultation via Video Call',
            treatment: 'Virtual Consultation',
            visitDate: date,
            reasonForVisit: 'Follow-up Video Consultation'
        });

        await patient.save();

        return res.status(200).json({
            success: true,
            message: 'Video call added to history.',
            data: patient
        });
    } catch (error) {
        console.error('Error adding video call to history:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};




export const getPatientVideoCallHistoryController = async (req, res) => {
    const { id } = req.params;

    try {
        const patient = await PatientInfo.findById(id);
        if(!patient){
            return res.status(404).json({
                success: false,
                message: 'Patient not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Video call history fetched successfully.',
            data: patient.videoCallHistory
        });
    } catch (error) {
        console.error('Error fetching video call history:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};


// Controller to get the medical history of a patient by ID
export const getPatientMedicalHistoryController = async (req, res) => {
    const { patientId } = req.params;

    try {
        // Find the patient by ID and select only the medicalHistory field
        const patient = await PatientInfo.findById(patientId, 'medicalHistory');
        if (!patient) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found.',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Medical history fetched successfully.',
            data: patient.medicalHistory,
        });
    } catch (error) {
        console.error('Error fetching medical history of patient:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.',
        });
    }
};
