import express from 'express';
import { deleteAdminController, getAllAdminController, loginAdminController, registerAdminController, updateAdminController } from '../Controllers/adminController.js';
import {authenticateUser, authorizeRoles} from '../Middlewares/authMiddleware.js'
import { deleteDoctorController, getAllDoctorsController } from '../Controllers/doctorController.js';
import { deletePatientController, getAllPatientController } from '../Controllers/patientController.js'


const router = express.Router();

router.route('/signup').post(registerAdminController)

router.route('/login').post(loginAdminController);

router.route('/get-all-admin').get(authenticateUser, authorizeRoles('Admin'), getAllAdminController);

router.route('/update-admin/:id').put(authenticateUser, authorizeRoles('Admin'), updateAdminController);

router.route('/delete-admin/:id').delete(authenticateUser, authorizeRoles('Admin'), deleteAdminController);

//Doctor
router.route('/get-all-doctor').get(authenticateUser, authorizeRoles('Admin'), getAllDoctorsController);

router.route('/delete-doctor/:id').delete(authenticateUser, authorizeRoles('Admin'), deleteDoctorController);

//Patient
router.route('/get-all-patient').get(authenticateUser, authorizeRoles('Admin'), getAllPatientController);

router.route('/delete-patient/:id').delete(authenticateUser, authorizeRoles('Admin'), deletePatientController);



export default router;