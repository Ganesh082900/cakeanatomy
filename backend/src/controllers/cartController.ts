import { Request, Response } from 'express';
import Cart from '../models/Cart';
import Product from '../models/Product';
import { AppError } from '../utils/AppError';
import { asyncHandler } from '../utils/asyncHandler';
import { AuthRequest } from '../middleware/auth';

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = asyncHandler(async (req: AuthRequest, res: Response) => {
  let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

  if (!cart) {
    cart = await Cart.create({ user: req.user._id, items: [] });
  }

  res.status(200).json({
    success: true,
    data: cart
  });
});

// @desc    Get cart by session ID (for guest users)
// @route   GET /api/cart/session/:sessionId
// @access  Public
export const getCartBySession = asyncHandler(async (req: Request, res: Response) => {
  let cart = await Cart.findOne({ sessionId: req.params.sessionId }).populate('items.product');

  if (!cart) {
    cart = await Cart.create({ sessionId: req.params.sessionId, items: [] });
  }

  res.status(200).json({
    success: true,
    data: cart
  });
});

// @desc    Add item to cart
// @route   POST /api/cart/items
// @access  Private
export const addToCart = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { productId, quantity, selectedVariants } = req.body;

  // Verify product exists and is available
  const product = await Product.findById(productId);

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  if (!product.isAvailable) {
    throw new AppError('Product is not available', 400);
  }

  if (product.stock < quantity) {
    throw new AppError(`Only ${product.stock} items available in stock`, 400);
  }

  // Get or create cart
  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = new Cart({ user: req.user._id, items: [] });
  }

  // Check if item already exists in cart
  const existingItemIndex = cart.items.findIndex(
    item => item.product.toString() === productId
  );

  if (existingItemIndex > -1) {
    // Update quantity if item exists
    cart.items[existingItemIndex].quantity += quantity;
    cart.items[existingItemIndex].selectedVariants = selectedVariants || [];
  } else {
    // Add new item
    cart.items.push({
      product: productId,
      quantity,
      price: product.price,
      selectedVariants: selectedVariants || [],
      subtotal: 0
    });
  }

  await cart.save();
  await cart.populate('items.product');

  res.status(200).json({
    success: true,
    data: cart
  });
});

// @desc    Update cart item quantity
// @route   PUT /api/cart/items/:productId
// @access  Private
export const updateCartItem = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { quantity } = req.body;
  const { productId } = req.params;

  if (quantity < 1) {
    throw new AppError('Quantity must be at least 1', 400);
  }

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    throw new AppError('Cart not found', 404);
  }

  const itemIndex = cart.items.findIndex(
    item => item.product.toString() === productId
  );

  if (itemIndex === -1) {
    throw new AppError('Item not found in cart', 404);
  }

  // Verify stock availability
  const product = await Product.findById(productId);
  if (product && product.stock < quantity) {
    throw new AppError(`Only ${product.stock} items available in stock`, 400);
  }

  cart.items[itemIndex].quantity = quantity;
  await cart.save();
  await cart.populate('items.product');

  res.status(200).json({
    success: true,
    data: cart
  });
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/items/:productId
// @access  Private
export const removeFromCart = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    throw new AppError('Cart not found', 404);
  }

  cart.items = cart.items.filter(item => item.product.toString() !== productId);
  await cart.save();
  await cart.populate('items.product');

  res.status(200).json({
    success: true,
    data: cart
  });
});

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = asyncHandler(async (req: AuthRequest, res: Response) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    throw new AppError('Cart not found', 404);
  }

  cart.items = [];
  await cart.save();

  res.status(200).json({
    success: true,
    data: cart
  });
});

// @desc    Apply coupon to cart
// @route   POST /api/cart/coupon
// @access  Private
export const applyCoupon = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { couponCode } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    throw new AppError('Cart not found', 404);
  }

  // TODO: Implement coupon validation logic
  // For now, apply a simple 10% discount
  const discountPercent = 10;
  cart.discount = cart.subtotal * (discountPercent / 100);
  cart.couponCode = couponCode;

  await cart.save();
  await cart.populate('items.product');

  res.status(200).json({
    success: true,
    data: cart
  });
});

// @desc    Merge guest cart with user cart
// @route   POST /api/cart/merge
// @access  Private
export const mergeCart = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { sessionId } = req.body;

  const guestCart = await Cart.findOne({ sessionId });
  if (!guestCart || guestCart.items.length === 0) {
    const userCart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    return res.status(200).json({
      success: true,
      data: userCart || { items: [] }
    });
  }

  let userCart = await Cart.findOne({ user: req.user._id });

  if (!userCart) {
    // Transfer guest cart to user
    guestCart.user = req.user._id;
    guestCart.sessionId = undefined;
    await guestCart.save();
    await guestCart.populate('items.product');

    return res.status(200).json({
      success: true,
      data: guestCart
    });
  }

  // Merge items
  for (const guestItem of guestCart.items) {
    const existingItemIndex = userCart.items.findIndex(
      item => item.product.toString() === guestItem.product.toString()
    );

    if (existingItemIndex > -1) {
      userCart.items[existingItemIndex].quantity += guestItem.quantity;
    } else {
      userCart.items.push(guestItem);
    }
  }

  await userCart.save();
  await userCart.populate('items.product');

  // Delete guest cart
  await Cart.findByIdAndDelete(guestCart._id);

  res.status(200).json({
    success: true,
    data: userCart
  });
});
