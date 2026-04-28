import express from 'express';
import {
  getAllProductions,
  getProductionById,
  createProduction,
  updateProduction,
  startProduction,
  completeProduction,
  getTodaysProduction
} from '../controllers/productionController';

const router = express.Router();

router.get('/', getAllProductions);
router.get('/today', getTodaysProduction);
router.get('/:id', getProductionById);
router.post('/', createProduction);
router.put('/:id', updateProduction);
router.post('/:id/start', startProduction);
router.post('/:id/complete', completeProduction);

export default router;
