import express from 'express';
import { filterDoctorsController, getDoctorByIdController, loginDoctorController, registerDoctorController, setDoctorAvailabilityContoller, updateDoctorController } from '../Controllers/doctorController.js';
import  { authenticateUser, authorizeRoles } from '../Middlewares/authMiddleware.js';
import { upload } from '../Middlewares/multerMiddleware.js';


const  router = express.Router();

router.route('/signup').post(upload, registerDoctorController);

router.route('/login').post(loginDoctorController);

router.route('/get-doctor/:id').get(authenticateUser, authorizeRoles('Admin', 'Doctor'), getDoctorByIdController);

router.route('/update-doctor/:id').put(authenticateUser, authorizeRoles('Doctor'), updateDoctorController);

router.route('/availability/:id').put(authenticateUser, authorizeRoles('Doctor'), setDoctorAvailabilityContoller);

router.route('/filter').get(authenticateUser, authorizeRoles('Doctor'), filterDoctorsController);

export default router;