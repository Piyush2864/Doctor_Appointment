import express from 'express';
import { deleteDoctorController, getAllDoctorsController, getDoctorByIdController, loginDoctorController, registerDoctorController, updateDoctorController } from '../Controllers/doctorController.js';
import authenticateUser, { authorizeRoles } from '../Middlewares/authMiddleware.js';


const router = express.Router();

router.route('/signup').post(registerDoctorController);

router.route('/login').post(loginDoctorController);

router.route('/get-all-doctor').get(authenticateUser, authorizeRoles('Admin'), getAllDoctorsController);

router.route('/get-doctor/:id').get(authenticateUser, authorizeRoles('Admin', 'Doctor'), getDoctorByIdController);

router.route('/update-doctor/:id').put(authenticateUser, authorizeRoles('Doctor'), updateDoctorController);

router.route('/delete-doctor/:id').delete(authenticateUser, authorizeRoles('Admin'), deleteDoctorController);

export default router;