import { Request, Response } from 'express';
import Category from '../models/Category';
import { AppError } from '../utils/AppError';
import { asyncHandler } from '../utils/asyncHandler';
import { AuthRequest } from '../middleware/auth';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = asyncHandler(async (req: Request, res: Response) => {
  const categories = await Category.find({ isActive: true })
    .populate('parent', 'name slug')
    .sort('order');

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories
  });
});

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
export const getCategory = asyncHandler(async (req: Request, res: Response) => {
  const category = await Category.findById(req.params.id).populate('parent', 'name slug');

  if (!category) {
    throw new AppError('Category not found', 404);
  }

  res.status(200).json({
    success: true,
    data: category
  });
});

// @desc    Get category by slug
// @route   GET /api/categories/slug/:slug
// @access  Public
export const getCategoryBySlug = asyncHandler(async (req: Request, res: Response) => {
  const category = await Category.findOne({ slug: req.params.slug }).populate('parent', 'name slug');

  if (!category) {
    throw new AppError('Category not found', 404);
  }

  res.status(200).json({
    success: true,
    data: category
  });
});

// @desc    Create new category
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = asyncHandler(async (req: AuthRequest, res: Response) => {
  const category = await Category.create(req.body);

  res.status(201).json({
    success: true,
    data: category
  });
});

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
export const updateCategory = asyncHandler(async (req: AuthRequest, res: Response) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!category) {
    throw new AppError('Category not found', 404);
  }

  res.status(200).json({
    success: true,
    data: category
  });
});

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = asyncHandler(async (req: AuthRequest, res: Response) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    throw new AppError('Category not found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Category deleted successfully'
  });
});
