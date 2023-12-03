import express from 'express';
const router = express.Router();
import {authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,} from '../controllers/userController.js'
import { admin,protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, admin, getUsers).post(registerUser);
router.post('/logout',logoutUser);
router.post('/login',authUser);
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);
router
    .route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser);

export default router;
