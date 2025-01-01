import express from 'express';
import { deletePatientController, getAllPatientController, getPatientByIdController, loginPatientController, registerPatientController, updatePatientController } from '../Controllers/patientController.js';
import authenticateUser, { authorizeRoles } from '../Middlewares/authMiddleware.js'


const router = express.Router();

router.route('/signup').post(registerPatientController);

router.route('/login').post(loginPatientController);

router.route('/get-all-patient').get(authenticateUser, authorizeRoles('Admin'), getAllPatientController);

router.route('/get-patient/:id').get(authenticateUser, authorizeRoles('Admin', 'Patient'), getPatientByIdController);

router.route('/update-patient/:id').put(authenticateUser, authorizeRoles('Patient'), updatePatientController);

router.route('/delete-patient/:id').delete(authenticateUser, authorizeRoles('Admin'), deletePatientController);

export default router;