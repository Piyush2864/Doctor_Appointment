import express from 'express';
import { getPatientByIdController, loginPatientController, registerPatientController, updatePatientController } from '../Controllers/patientController.js';
import  { authenticateUser, authorizeRoles } from '../Middlewares/authMiddleware.js'


const router = express.Router();

router.route('/signup').post(registerPatientController);

router.route('/login').post(loginPatientController);

router.route('/get-patient/:id').get(authenticateUser, authorizeRoles('Admin', 'Patient'), getPatientByIdController);

router.route('/update-patient/:id').put(authenticateUser, authorizeRoles('Patient'), updatePatientController);

export default router;