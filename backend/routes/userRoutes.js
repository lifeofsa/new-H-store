import express from 'express';
import {
  userController,
  registerUser,
  getUser,
  getUserUpdate,
  getUserAdmin,
  deleteUserAdmin,
  getUserById,
  getUpdateById,
  facebookController,
} from '../controllers/userController.js';

import { admin, protect } from '../Middleware/authMiddleware.js';
const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUserAdmin);
router.route('/facebook').post(facebookController);

// router.post('/facebook', facebookController).get(protect, admin, getUserAdmin);
router.post('/login', userController);
router.route('/profile').get(protect, getUser).put(protect, getUserUpdate);

router
  .route('/:id')
  .delete(protect, admin, deleteUserAdmin)
  .get(protect, admin, getUserById)
  .put(protect, admin, getUpdateById);

export default router;
