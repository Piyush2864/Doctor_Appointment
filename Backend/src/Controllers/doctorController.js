import DoctorInfo from '../Models/doctorModel.js';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

export const registerDoctorController = async (req, res) => {
    try {
        const { 
            name, email, password, 
            contactNumber, 
        } = req.body;
        
        const profilePicture = req.file ? req.file.path : null;

        // Validate required fields
        if (!name || !email || !password || !contactNumber) {
            return res.status(400).json({ 
                success: false, 
                message: "All required fields must be provided." 
            });
        }

        // Check if doctor already exists
        const existingDoctor = await DoctorInfo.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({
                success: false,
                message: "Doctor already exists."
            });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create doctor entry
        const doctor = new DoctorInfo({
            name,
            email,
            password: hashedPassword,
            // specialization,
            // description,
            // experience,
            contactNumber,
            // shifts,
            // clinicAddress,
            // city,
            // profilePicture,
            // fees,
            // videoConsultationTimings: videoConsultationTimings || [],
            // maxVideoConsultationsPerDay: maxVideoConsultationsPerDay || 0,
            // emergencyAvailability: emergencyAvailability || false
        });

        // Save doctor to database
        await doctor.save();

        return res.status(201).json({
            success: true,
            message: "Doctor registered successfully!",
            data: doctor
        });
    } catch (error) {
        console.error("Error registering doctor:", error);
        return res.status(500).json({
            success: false,
            message: "Server error. Please try again later."
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


export const getAllDoctorsController = async (req, res) => {
    const { page = 1, limit = 10, sortBy = 'ratings', order = 'desc' } = req.query;

    try {
        const doctors = await DoctorInfo.find({}, '-password')
            .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalDoctors = await DoctorInfo.countDocuments();

        return res.status(200).json({
            success: true,
            message: "Doctors fetched successfully.",
            data: doctors,
            total: totalDoctors,
            page,
            totalPages: Math.ceil(totalDoctors / limit)
        });
    } catch (error) {
        console.error('Error fetching doctors:', error);
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


export const updateDoctorController = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const doctor = await DoctorInfo.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!doctor) {
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
        console.error('Error updating doctor profile:', error);
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


export const filterDoctorsController = async (req, res) => {
    const { specialization, experience, city, emergencyAvailability, minRating, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const filter = {};
    if (specialization) {
        filter.specialization = { $regex: specialization, $options: 'i' };
    }
    if (experience) {
        filter.experience = { $gte: parseInt(experience) };
    }
    if (city) {
        filter.city = { $regex: city, $options: 'i' };
    }
    if (emergencyAvailability) {
        filter.emergencyAvailability = emergencyAvailability === 'true';
    }
    if (minRating) {
        filter.ratings = { $gte: parseFloat(minRating) };
    }

    try {
        const doctors = await DoctorInfo.find(filter).skip(skip).limit(parseInt(limit));
        const totalDoctors = await DoctorInfo.countDocuments(filter);

        return res.status(200).json({
            success: true,
            data: doctors,
            total: totalDoctors,
            page,
            totalPage: Math.ceil(totalDoctors / limit),
        });
    } catch (error) {
        console.error('Error filtering doctors:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};


export const addDoctorReviewController = async (req, res) => {
    const { doctorId } = req.params;
    const { patientId, review, rating } = req.body;

    try {
        const doctor = await DoctorInfo.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found."
            });
        }

        const existingReviewIndex = doctor.reviews.findIndex(r => r.patientId.toString() === patientId);
        if (existingReviewIndex !== -1) {
            // Update existing review
            doctor.reviews[existingReviewIndex] = { patientId, review, rating };
        } else {
            // Add new review
            doctor.reviews.push({ patientId, review, rating });
        }

        doctor.ratings = doctor.reviews.reduce((sum, r) => sum + r.rating, 0) / doctor.reviews.length;

        await doctor.save();

        return res.status(200).json({
            success: true,
            message: "Review added/updated successfully.",
            data: doctor
        });
    } catch (error) {
        console.error('Error managing reviews:', error);
        return res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
};
