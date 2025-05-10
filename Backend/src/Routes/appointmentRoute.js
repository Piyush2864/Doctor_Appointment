import express from 'express';
import {authenticateUser, authorizeRoles} from '../Middlewares/authMiddleware.js'
import { addVideoCallToHistoryController, bookAppointmentController, cancelAppointmentController, getAppointmentByDoctorController, getAppointmentByIdController, getAppointmentByPatientController, getAvailableSlotsController, getTopReasonController, updateAppointmentsStatusController } from '../Controllers/appointmentController.js';


const router = express.Router();


router.route('/book-appointment').post(authenticateUser, authorizeRoles('Patient'), bookAppointmentController);

router.route('/doctor/:doctorId').get(authenticateUser, authorizeRoles('Doctor'), getAppointmentByDoctorController);

router.route('/patient/:patientId').get(authenticateUser, authorizeRoles('Patient'), getAppointmentByPatientController);

router.route('/status/:appointmentId').put(authenticateUser, authorizeRoles('Doctor'), updateAppointmentsStatusController);

router.route('/cancel/:appointmentId').delete(authenticateUser, authorizeRoles('Doctor', 'Patient'), cancelAppointmentController);

router.route('/get-appointment/:appointmentId').get(authenticateUser, authorizeRoles('Admin', 'Doctor', 'Patient'), getAppointmentByIdController);

router.route('/available-slots').post(authenticateUser, authorizeRoles('Admin', 'Doctor', 'Patient'), getAvailableSlotsController);

router.route('/top-reasons',).get(authenticateUser, authorizeRoles('Admin', 'Doctor',), getTopReasonController);

router.route('/video-call-history').post(authenticateUser, authorizeRoles('Doctor', 'Patient'), addVideoCallToHistoryController)

export default router;