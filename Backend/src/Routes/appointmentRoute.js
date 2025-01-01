import express from 'express';
import {authenticateuser, authorizeRoles} from '../Middlewares/authMiddleware.js'
import { bookAppointmentController, cancelAppointmentController, getAppointmentByDoctorController, getAppointmentByIdController, getAppointmentByPatientController, updateAppointmentsStatusController } from '../Controllers/appointmentController.js';


const router = express.Router();


router.route('/book').post(authenticateuser, authorizeRoles('Patient'), bookAppointmentController);

router.route('/doctor/:doctorId').get(authenticateuser, authorizeRoles('Doctor'), getAppointmentByDoctorController);

router.route('/patient/:patientid').get(authenticateuser, authorizeRoles('Patient'), getAppointmentByPatientController);

router.route('/status/:appointmentid').put(authenticateuser, authorizeRoles('Doctor'), updateAppointmentsStatusController);

router.route('/cancel/:appointment').delete(authenticateuser, authorizeRoles('Doctor', 'Patient'), cancelAppointmentController);

router.route('/get-appointment/:appointmentId').get(authenticateuser, authorizeRoles('Admin', 'Doctor', 'Patient'), getAppointmentByIdController);

export default router;