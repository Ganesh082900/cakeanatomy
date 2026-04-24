import express from 'express';
import {
  getAllRawMaterials,
  getRawMaterialById,
  createRawMaterial,
  updateRawMaterial,
  deleteRawMaterial,
  getLowStockItems,
  getExpiringItems,
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe
} from '../controllers/inventoryController';

const router = express.Router();

// Raw materials
router.get('/materials', getAllRawMaterials);
router.get('/materials/low-stock', getLowStockItems);
router.get('/materials/expiring', getExpiringItems);
router.get('/materials/:id', getRawMaterialById);
router.post('/materials', createRawMaterial);
router.put('/materials/:id', updateRawMaterial);
router.delete('/materials/:id', deleteRawMaterial);

// Recipes
router.get('/recipes', getAllRecipes);
router.get('/recipes/:id', getRecipeById);
router.post('/recipes', createRecipe);
router.put('/recipes/:id', updateRecipe);

export default router;
