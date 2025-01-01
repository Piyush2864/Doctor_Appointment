import AdminInfo from '../Models/adminModel.js';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';


export const registerAdminController = async(req, res)=> {
    const { name, email, password } = req.body;

    try {
        const existingAdmin = await AdminInfo.findOne({ email });
        if(existingAdmin) {
            return res.status(400).json({
                success: false,
                message: 'Admin already exists.'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new AdminInfo({
            name,
            email,
            password: hashedPassword,
        });

        await admin.save();

        return res.status(201).json({
            success: true,
            message: 'Admin registered successfully.',
            data: admin
        });
    } catch (error) {
        console.error('Error registering admin.', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};


export const loginAdminController = async(req, res)=> {
    const { email, password } = req.body;

    try {
        const admin = await AdminInfo.findOne({ email });
        if(!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found!'
            });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials!'
            });
        }

        const token = JWT.sign({ id: admin._id, role: 'Admin'}, process.env.JWT_SECRET, {expiresIn: '1d'});

        return res.status(200).json({
            success: false,
            message: 'Login successfull.',
            data: admin
        });
    } catch (error) {
        console.error('Error logging admin.', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};


export const getAllAdminController = async(req, res) => {
    try {
        const admins = await AdminInfo.find().select('-password');
        if(!admins){
            return res.status(404).json({
                success: false,
                message: 'Admins not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Admins fetched successfully.',
            data: admins
        });
    } catch (error) {
        console.error('Error fetching admin.', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};


export const updateAdminController = async(req, res)=> {
    const { name, email } = req.body;

    try {
        const updateAdmin = await AdminInfo.findByIdAndUpdate(
            req.params.id,
            {name, email},
            {new: true, runValidators: true}
        );
        if(!updateAdmin) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Admin updated successfully.',
            data: updateAdmin
        });
    } catch (error) {
        console.error('Error updating admin.', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};


export const deleteAdminController = async(req, res)=> {
    try {
        const admin = await AdminInfo.findByIdAndDelete(req.params.id);
        if(!admin){
            return res.status(404).json({
                success: false,
                message:'Admin not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Admin deleted successfully.'
        });
    } catch (error) {
        console.error('Error deleting admin.', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};