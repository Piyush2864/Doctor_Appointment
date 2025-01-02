import DoctorInfo from '../Models/doctorModel.js'
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';


export const registerDoctorController = async (req, res) => {
    const { name, email, password, specialization, description, experience, contactNumber, shifts, clinicAddress, city, profilePicture } = req.body;
    
    try {
        
        const existingDoctor = await DoctorInfo.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({
                success: false,
                message: 'Doctor already exists.'
            });
        }

       
        const hashedPassword = await bcrypt.hash(password, 10);

       
        const doctor = new DoctorInfo({
            name,
            email,
            password: hashedPassword,
            specialization,
            description,
            experience,
            contactNumber,
            shifts,  
            clinicAddress,
            city,
            profilePicture,
        });


        await doctor.save();

        return res.status(201).json({
            success: true,
            message: "Doctor registered successfully!",
            data: doctor
        });
    } catch (error) {
        console.error('Error registering doctor:', error);
        return res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
};

export const loginDoctorController = async(req, res)=> {
    const { email, password } = req.body;

    try {
        const doctor = await DoctorInfo.findOne({ email });
        if(!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found."
            });
        }

        const isMatch = await bcrypt.compare(password, doctor.password);
        if(!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials."
            });
        }

        const secretKey = process.env.JWT_SECRET || "Piyush123";
        const token = JWT.sign({id: doctor._id, role: 'Doctor'}, secretKey, { expiresIn: "1d"});

        return res.status(200).json({
            success: true,
            message: "Login successfully.",
            token,
            data: doctor
        });
    } catch (error) {
        console.error('Error Logging doctor.:', error);
        return res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
};


export const getAllDoctorsController = async(req, res)=> {
    try {
        const doctors = await DoctorInfo.diffIndexes({}, '-password');
        if(!doctors) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Doctors fetched successfully.",
            data: doctors
        });
    } catch (error) {
        console.error('Error fetching doctors.:', error);
        return res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
};


export const getDoctorByIdController = async(req, res)=> {
    const { id } = req.params;
    try {
        const doctor = await DoctorInfo.findById(id, '-password');
        if(!doctor) {
            return res.status(404).json({
                success: false,
                message: 'DOctor not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: "Doctor fetched successfully.",
            data: doctor
        });
    } catch (error) {
        console.error('Error fetching doctor.:', error);
        return res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
};


export const updateDoctorController = async(req, res)=> {
    const { id } = req.params;
    const updates = req.body;

    try {
        const doctor = await DoctorInfo.findByIdAndUpdate(id, updates, { new: true, runValidators: true});
        if(!doctor){
            return res.status(404).json({
                success: false,
                message: 'Doctor not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Doctor profile updated successfully.',
            data: doctor
        });
    } catch (error) {
        console.error('Error updating doctor profile.:', error);
        return res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
};


export const deleteDoctorController = async(req, res)=> {
    const { id } = req.params;

    try {
        const doctor = await DoctorInfo.findByIdAndDelete(id);
        if(!doctor){
            return res.status(404).json({
                success: false,
                message: 'Doctor not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Doctor deleted successfully.',
        })
    } catch (error) {
        console.error('Error deleting doctor.:', error);
        return res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
};


export const setDoctorAvailabilityContoller = async(req, res)=> {
    const { id } = req.params;
    const { availability } = req.body;

    try {
        const doctor = await DoctorInfo.findByIdAndUpdate(id, {availability}, {new: true, runValidators: true});
        if(!doctor){
            return res.status(404).json({
                success: false,
                message: "Doctor not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Doctor availability updated successfully.',
            data: doctor
        });
    } catch (error) {
        console.error('Error updating avaailability of doctor.:', error);
        return res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
};