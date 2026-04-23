import { Request, Response, NextFunction } from 'express';
import Product from '../models/Product';
import Category from '../models/Category';
import { AppError } from '../utils/AppError';
import { asyncHandler } from '../utils/asyncHandler';
import { AuthRequest } from '../middleware/auth';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 12;
  const skip = (page - 1) * limit;

  // Build query
  const query: any = { isAvailable: true };

  // Filter by category
  if (req.query.category) {
    query.category = req.query.category;
  }

  // Filter by type
  if (req.query.type) {
    query.type = req.query.type;
  }

  // Filter by price range
  if (req.query.minPrice || req.query.maxPrice) {
    query.price = {};
    if (req.query.minPrice) query.price.$gte = parseFloat(req.query.minPrice as string);
    if (req.query.maxPrice) query.price.$lte = parseFloat(req.query.maxPrice as string);
  }

  // Search by name
  if (req.query.search) {
    query.$or = [
      { name: { $regex: req.query.search, $options: 'i' } },
      { description: { $regex: req.query.search, $options: 'i' } },
      { tags: { $in: [new RegExp(req.query.search as string, 'i')] } }
    ];
  }

  // Filter featured
  if (req.query.featured === 'true') {
    query.isFeatured = true;
  }

  // Sorting
  let sortBy = '-createdAt';
  if (req.query.sort === 'price-asc') sortBy = 'price';
  if (req.query.sort === 'price-desc') sortBy = '-price';
  if (req.query.sort === 'name') sortBy = 'name';
  if (req.query.sort === 'rating') sortBy = '-rating';

  const products = await Product.find(query)
    .populate('category', 'name slug')
    .sort(sortBy)
    .skip(skip)
    .limit(limit);

  const total = await Product.countDocuments(query);

  res.status(200).json({
    success: true,
    count: products.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    data: products
  });
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id).populate('category', 'name slug');

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc    Get product by slug
// @route   GET /api/products/slug/:slug
// @access  Public
export const getProductBySlug = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findOne({ slug: req.params.slug }).populate('category', 'name slug');

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: product
  });
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully'
  });
});

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
export const getFeaturedProducts = asyncHandler(async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 8;

  const products = await Product.find({ isFeatured: true, isAvailable: true })
    .populate('category', 'name slug')
    .limit(limit)
    .sort('-createdAt');

  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
});
