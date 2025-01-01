import express from 'express';
import { deleteAdminController, getAllAdminController, loginAdminController, registerAdminController, updateAdminController } from '../Controllers/adminController.js';
import {authenticateUser, authorizeRoles} from '../Middlewares/authMiddleware.js'


const router = express.Router();

router.route('/signup').post(registerAdminController)

router.route('/login').post(loginAdminController);

router.route('/get-all-admin').get(authenticateUser, authorizeRoles('Admin'), getAllAdminController);

router.route('/update-admin/:id').put(authenticateUser, authorizeRoles('Admin'), updateAdminController);

router.route('/delete-admin/:id').delete(authenticateUser, authorizeRoles('Admin'), deleteAdminController);

export default router;