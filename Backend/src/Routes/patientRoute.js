import express from 'express';
import { 
    addAppointmentToHistoryController,
    addVideoCallToHistoryController,
    getPatientByIdController, 
    getPatientHistoryController, 
    getPatientMedicalHistoryController, 
    getPatientVideoCallHistoryController, 
    loginPatientController, 
    registerPatientController, 
    updatePatientController 
} from '../Controllers/patientController.js';
import  { 
    authenticateUser, 
    authorizeRoles 
} from '../Middlewares/authMiddleware.js'
import { upload } from '../Middlewares/multerMiddleware.js';


const router = express.Router();

router.route('/signup').post(upload, registerPatientController);

router.route('/login').post(loginPatientController);

router.route('/get-patient/:id').get(authenticateUser, authorizeRoles('Admin', 'Patient'), getPatientByIdController);

router.route('/update-patient/:id').put(authenticateUser, authorizeRoles('Patient'), updatePatientController);

router.route('/appointment-history').post(authenticateUser, authorizeRoles('Admin', 'Patient'), addAppointmentToHistoryController);

router.route('/medical-history/:patientId').get(authenticateUser, authorizeRoles('Admin', 'Patient', 'Doctor'), getPatientMedicalHistoryController)

router.route('/patient-history/:patientId').get(authenticateUser, authorizeRoles('Admin', 'Patient'), getPatientHistoryController);

router.route('/video-call-history').post(authenticateUser, authorizeRoles('Admin', 'Doctor', 'Patient'), addVideoCallToHistoryController);

router.route('/video-call-history/:id').get(authenticateUser, authorizeRoles('Admin', 'Doctor', 'Patient'), getPatientVideoCallHistoryController);

export default router;