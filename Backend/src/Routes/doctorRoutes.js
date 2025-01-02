import express from 'express';
import { getDoctorByIdController, loginDoctorController, registerDoctorController, updateDoctorController } from '../Controllers/doctorController.js';
import  { authenticateUser, authorizeRoles } from '../Middlewares/authMiddleware.js';


const router = express.Router();

router.route('/signup').post(registerDoctorController);

router.route('/login').post(loginDoctorController);

router.route('/get-doctor/:id').get(authenticateUser, authorizeRoles('Admin', 'Doctor'), getDoctorByIdController);

router.route('/update-doctor/:id').put(authenticateUser, authorizeRoles('Doctor'), updateDoctorController);

export default router;