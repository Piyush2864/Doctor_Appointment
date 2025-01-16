import express from 'express';
import { addDoctorReviewController, filterDoctorsController, getDoctorByIdController, loginDoctorController, registerDoctorController, setDoctorAvailabilityContoller, updateDoctorController } from '../Controllers/doctorController.js';
import  { authenticateUser, authorizeRoles } from '../Middlewares/authMiddleware.js';
import { upload } from '../Middlewares/multerMiddleware.js';


const  router = express.Router();

router.route('/signup').post(registerDoctorController);

router.route('/login').post(loginDoctorController);

router.route('/get-doctor/:id').get(authenticateUser, authorizeRoles('Admin', 'Doctor'), getDoctorByIdController);

<<<<<<< HEAD
router.route('/update-doctor/:id').put(
    authenticateUser, // Ensure the user is authenticated
    authorizeRoles('Doctor'), // Ensure the user has the 'Doctor' role
    upload.single('profilePicture'), // Handle file upload for 'profilePicture'
    updateDoctorController // Call the controller to handle the update logic
);
=======
router.route('/update-doctor/:id').put(authenticateUser, authorizeRoles('Doctor'), upload.single('profilePicture'), updateDoctorController);
>>>>>>> 470953685ca541b2bc11bb467c1dd969edd69726

router.route('/availability/:id').put(authenticateUser, authorizeRoles('Doctor'), setDoctorAvailabilityContoller);

router.route('/filter').get(authenticateUser, authorizeRoles('Doctor'), filterDoctorsController);

router.route('/review/:doctorId').post(authenticateUser, authorizeRoles('Patient'), addDoctorReviewController);

export default router;