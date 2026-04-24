import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  getUserOrders,
  addLoyaltyPoints
} from '../controllers/userController';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.get('/:id/orders', getUserOrders);
router.post('/:id/loyalty-points', addLoyaltyPoints);

export default router;
