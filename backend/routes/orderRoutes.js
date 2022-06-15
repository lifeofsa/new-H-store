import express from 'express';
import {
  getMyOrder,
  getMyOrdersController,
  orderCreateController,
  orderGetController,
  updateDeliverController,
  updatePayOrderController,
} from '../controllers/orderControllers.js';
import { admin, protect } from '../Middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .post(protect, orderCreateController)
  .get(protect, admin, getMyOrder);
router.route('/myorders').get(protect, getMyOrdersController);
router.route('/:id').get(protect, orderGetController);
router.route('/:id/pay').put(protect, updatePayOrderController);
router.route('/:id/deliver').put(protect, admin, updateDeliverController);

export default router;
