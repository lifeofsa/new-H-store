import express from 'express';
const router = express.Router();
import {
  getProducts,
  productById,
  productDeleteId,
  productUpdateId,
  productCreateId,
  productCreatedReview,
  productCarousel,
  deleteReviewAdmin,
} from '../controllers/productController.js';
import { admin, protect } from '../Middleware/authMiddleware.js';

router.route('/').get(getProducts).post(protect, admin, productCreateId);

router.get('/top', productCarousel);
router.route('/:id/reviews').post(protect, productCreatedReview);
router.route('/:id/reviews/:rid').delete(protect, admin, deleteReviewAdmin);

router
  .route('/:id')
  .get(productById)
  .delete(protect, admin, productDeleteId)
  .put(protect, admin, productUpdateId);

export default router;
