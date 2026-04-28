import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      status: err.status,
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
    return;
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    res.status(400).json({
      success: false,
      status: 'fail',
      message: 'Validation Error',
      errors: err.message
    });
    return;
  }

  // Handle Mongoose duplicate key errors
  if (err.name === 'MongoServerError' && (err as any).code === 11000) {
    const field = Object.keys((err as any).keyPattern)[0];
    res.status(400).json({
      success: false,
      status: 'fail',
      message: `${field} already exists`
    });
    return;
  }

  // Handle Mongoose cast errors
  if (err.name === 'CastError') {
    res.status(400).json({
      success: false,
      status: 'fail',
      message: 'Invalid ID format'
    });
    return;
  }

  // Default error
  console.error('ERROR 💥:', err);
  res.status(500).json({
    success: false,
    status: 'error',
    message: 'Something went wrong',
    ...(process.env.NODE_ENV === 'development' && { 
      error: err.message,
      stack: err.stack 
    })
  });
};

export const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new AppError(`Route ${req.originalUrl} not found`, 404);
  next(error);
};
