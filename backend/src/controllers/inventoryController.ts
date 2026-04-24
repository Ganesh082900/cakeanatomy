import { Request, Response } from 'express';
import RawMaterial from '../models/RawMaterial';
import Recipe from '../models/Recipe';

// Raw Materials
export const getAllRawMaterials = async (req: Request, res: Response) => {
  try {
    const { category, status } = req.query;
    const query: any = {};
    
    if (category) query.category = category;
    if (status) query.status = status;

    const materials = await RawMaterial.find(query)
      .populate('supplier', 'name contact')
      .sort({ name: 1 });

    res.json({ success: true, data: materials });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRawMaterialById = async (req: Request, res: Response) => {
  try {
    const material = await RawMaterial.findById(req.params.id).populate('supplier');
    if (!material) {
      return res.status(404).json({ success: false, message: 'Material not found' });
    }
    res.json({ success: true, data: material });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createRawMaterial = async (req: Request, res: Response) => {
  try {
    const material = await RawMaterial.create(req.body);
    res.status(201).json({ success: true, data: material });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateRawMaterial = async (req: Request, res: Response) => {
  try {
    const material = await RawMaterial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!material) {
      return res.status(404).json({ success: false, message: 'Material not found' });
    }
    
    res.json({ success: true, data: material });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteRawMaterial = async (req: Request, res: Response) => {
  try {
    const material = await RawMaterial.findByIdAndDelete(req.params.id);
    if (!material) {
      return res.status(404).json({ success: false, message: 'Material not found' });
    }
    res.json({ success: true, message: 'Material deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getLowStockItems = async (req: Request, res: Response) => {
  try {
    const materials = await RawMaterial.find({
      status: { $in: ['low-stock', 'out-of-stock'] }
    }).sort({ currentStock: 1 });

    res.json({ success: true, data: materials });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getExpiringItems = async (req: Request, res: Response) => {
  try {
    const materials = await RawMaterial.find({
      status: { $in: ['expiring-soon', 'expired'] }
    }).sort({ expiryDate: 1 });

    res.json({ success: true, data: materials });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Recipes
export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.find()
      .populate('ingredients.material', 'name unit')
      .sort({ name: 1 });

    res.json({ success: true, data: recipes });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRecipeById = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate('ingredients.material', 'name unit unitPrice');
      
    if (!recipe) {
      return res.status(404).json({ success: false, message: 'Recipe not found' });
    }
    
    res.json({ success: true, data: recipe });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.create(req.body);
    res.status(201).json({ success: true, data: recipe });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!recipe) {
      return res.status(404).json({ success: false, message: 'Recipe not found' });
    }
    
    res.json({ success: true, data: recipe });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
