import express from 'express';
import { 
    addAppointmentToHistoryController,
    getPatientByIdController, 
    getPatientHistoryController, 
    loginPatientController, 
    registerPatientController, 
    updatePatientController 
} from '../Controllers/patientController.js';
import  { 
    authenticateUser, 
    authorizeRoles 
} from '../Middlewares/authMiddleware.js'


const router = express.Router();

router.route('/signup').post(registerPatientController);

router.route('/login').post(loginPatientController);

router.route('/get-patient/:id').get(authenticateUser, authorizeRoles('Admin', 'Patient'), getPatientByIdController);

router.route('/update-patient/:id').put(authenticateUser, authorizeRoles('Patient'), updatePatientController);

router.route('/history').post(authenticateUser, authorizeRoles('Admin', 'Patient'), addAppointmentToHistoryController);

router.route('/patient-history/:patientId').get(authenticateUser, authorizeRoles('Admin', 'Patient'), getPatientHistoryController);

export default router;