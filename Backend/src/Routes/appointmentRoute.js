import express from 'express';
import {authenticateUser, authorizeRoles} from '../Middlewares/authMiddleware.js'
import { bookAppointmentController, cancelAppointmentController, getAppointmentByDoctorController, getAppointmentByIdController, getAppointmentByPatientController, getAvailableSlotsController, updateAppointmentsStatusController } from '../Controllers/appointmentController.js';


const router = express.Router();


router.route('/book').post(authenticateUser, authorizeRoles('Patient'), bookAppointmentController);

router.route('/doctor/:doctorId').get(authenticateUser, authorizeRoles('Doctor'), getAppointmentByDoctorController);

router.route('/patient/:patientid').get(authenticateUser, authorizeRoles('Patient'), getAppointmentByPatientController);

router.route('/status/:appointmentid').put(authenticateUser, authorizeRoles('Doctor'), updateAppointmentsStatusController);

router.route('/cancel/:appointment').delete(authenticateUser, authorizeRoles('Doctor', 'Patient'), cancelAppointmentController);

router.route('/get-appointment/:appointmentId').get(authenticateUser, authorizeRoles('Admin', 'Doctor', 'Patient'), getAppointmentByIdController);

router.route('/available-slots').post(authenticateUser, authorizeRoles('Admin', 'Doctor', 'Patient'), getAvailableSlotsController);

export default router;