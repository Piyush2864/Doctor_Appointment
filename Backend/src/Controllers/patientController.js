import PatientInfo from '../Models/patientModel.js';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';


export const registerPatientController = async(req, res)=> {
    const { name, email, password, age, gender, contactNumber } = req.body;

    try {
        const existingPatient = await PatientInfo.findOne({ email });
        if(existingPatient){
            return res.status(400).json({
                success: false,
                message: 'Patient already exists!'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const patient = new PatientInfo({
            name,
            email,
            password: hashedPassword,
            age, 
            gender,
            contactNumber
        });

        await patient.save();

        return res.status(201).json({
            success: true,
            message: 'Patient registered successfully.',
            data: patient
        })
    } catch (error) {
        console.error('Error registering patient.:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};


export const loginPatientController = async(req, res)=> {
    const { email, password } = req.body;

    try {
        const patient = await PatientInfo.findone({ email });
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

        const token = JWT.sign({id: patient._id, role: 'Patient'}, process.env.JWT_SECRET, { expiresIn: "1d"});

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


export const getPatientMedicalHistoryController = async(req, res)=> {
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
            messaeg: 'Medical history fetched successfully.',
            data: patient
        })
    } catch (error) {
        console.error('Error fetching medical history of patient.:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};