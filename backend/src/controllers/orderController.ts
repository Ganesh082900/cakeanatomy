import { Request, Response } from 'express';
import Order from '../models/Order';
import Cart from '../models/Cart';
import Product from '../models/Product';
import { AppError } from '../utils/AppError';
import { asyncHandler } from '../utils/asyncHandler';
import { AuthRequest } from '../middleware/auth';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = asyncHandler(async (req: AuthRequest, res: Response) => {
  const {
    shippingAddress,
    billingAddress,
    paymentMethod,
    notes
  } = req.body;

  // Get user's cart
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

  if (!cart || cart.items.length === 0) {
    throw new AppError('Cart is empty', 400);
  }

  // Verify stock availability for all items
  for (const item of cart.items) {
    const product = await Product.findById(item.product._id);
    if (!product) {
      throw new AppError(`Product ${item.product._id} not found`, 404);
    }
    if (product.stock < item.quantity) {
      throw new AppError(
        `Insufficient stock for ${product.name}. Only ${product.stock} available`,
        400
      );
    }
  }

  // Prepare order items
  const orderItems = cart.items.map(item => ({
    product: item.product._id,
    name: (item.product as any).name,
    image: (item.product as any).images[0],
    quantity: item.quantity,
    price: item.price,
    selectedVariants: item.selectedVariants,
    subtotal: item.subtotal
  }));

  // Calculate prices
  const itemsPrice = cart.subtotal;
  const taxPrice = cart.tax;
  const shippingPrice = itemsPrice > 1000 ? 0 : 50; // Free shipping above ₹1000
  const discount = cart.discount || 0;
  const totalPrice = itemsPrice + taxPrice + shippingPrice - discount;

  // Create order
  const order = await Order.create({
    user: req.user._id,
    items: orderItems,
    shippingAddress,
    billingAddress: billingAddress || shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    discount,
    totalPrice,
    couponCode: cart.couponCode,
    notes,
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
  });

  // Update product stock
  for (const item of cart.items) {
    await Product.findByIdAndUpdate(item.product._id, {
      $inc: { stock: -item.quantity }
    });
  }

  // Clear cart
  cart.items = [];
  await cart.save();

  res.status(201).json({
    success: true,
    data: order
  });
});

// @desc    Get all orders for user
// @route   GET /api/orders
// @access  Private
export const getMyOrders = asyncHandler(async (req: AuthRequest, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const orders = await Order.find({ user: req.user._id })
    .sort('-createdAt')
    .skip(skip)
    .limit(limit);

  const total = await Order.countDocuments({ user: req.user._id });

  res.status(200).json({
    success: true,
    count: orders.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    data: orders
  });
});

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
export const getOrder = asyncHandler(async (req: AuthRequest, res: Response) => {
  const order = await Order.findById(req.params.id).populate('items.product', 'name slug images');

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  // Make sure user owns this order
  if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new AppError('Not authorized to access this order', 403);
  }

  res.status(200).json({
    success: true,
    data: order
  });
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = asyncHandler(async (req: AuthRequest, res: Response) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  // Make sure user owns this order
  if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new AppError('Not authorized to update this order', 403);
  }

  order.isPaid = true;
  order.paidAt = new Date();
  order.paymentStatus = 'completed';
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    updateTime: new Date(),
    emailAddress: req.body.email_address
  };
  order.orderStatus = 'confirmed';

  const updatedOrder = await order.save();

  res.status(200).json({
    success: true,
    data: updatedOrder
  });
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
export const updateOrderToDelivered = asyncHandler(async (req: AuthRequest, res: Response) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  order.isDelivered = true;
  order.deliveredAt = new Date();
  order.orderStatus = 'delivered';

  const updatedOrder = await order.save();

  res.status(200).json({
    success: true,
    data: updatedOrder
  });
});

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
export const cancelOrder = asyncHandler(async (req: AuthRequest, res: Response) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  // Make sure user owns this order
  if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new AppError('Not authorized to cancel this order', 403);
  }

  // Can't cancel delivered orders
  if (order.isDelivered) {
    throw new AppError('Cannot cancel delivered order', 400);
  }

  // Can't cancel shipped orders (only admin can)
  if (order.orderStatus === 'shipped' && req.user.role !== 'admin') {
    throw new AppError('Cannot cancel shipped order. Please contact support.', 400);
  }

  order.orderStatus = 'cancelled';
  order.cancelledAt = new Date();
  order.cancellationReason = req.body.reason || 'Customer requested cancellation';

  // Restore product stock
  for (const item of order.items) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: item.quantity }
    });
  }

  // If order was paid, mark for refund
  if (order.isPaid) {
    order.paymentStatus = 'refunded';
  }

  const updatedOrder = await order.save();

  res.status(200).json({
    success: true,
    data: updatedOrder
  });
});

// @desc    Get all orders (Admin)
// @route   GET /api/orders/admin/all
// @access  Private/Admin
export const getAllOrders = asyncHandler(async (req: AuthRequest, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const skip = (page - 1) * limit;

  const query: any = {};

  // Filter by status
  if (req.query.status) {
    query.orderStatus = req.query.status;
  }

  // Filter by payment status
  if (req.query.paymentStatus) {
    query.paymentStatus = req.query.paymentStatus;
  }

  const orders = await Order.find(query)
    .populate('user', 'name email')
    .sort('-createdAt')
    .skip(skip)
    .limit(limit);

  const total = await Order.countDocuments(query);

  res.status(200).json({
    success: true,
    count: orders.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    data: orders
  });
});

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { orderStatus, trackingNumber } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  order.orderStatus = orderStatus;

  if (trackingNumber) {
    order.trackingNumber = trackingNumber;
  }

  const updatedOrder = await order.save();

  res.status(200).json({
    success: true,
    data: updatedOrder
  });
});
