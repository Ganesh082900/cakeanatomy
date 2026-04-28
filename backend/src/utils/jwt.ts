import jwt from 'jsonwebtoken';
import { Response } from 'express';

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export const generateToken = (payload: TokenPayload): string => {
  const secret = process.env.JWT_SECRET || 'your-secret-key-change-this';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token: string): TokenPayload => {
  const secret = process.env.JWT_SECRET || 'your-secret-key-change-this';
  return jwt.verify(token, secret) as TokenPayload;
};

export const sendTokenResponse = (
  user: { _id: string; email: string; role: string; name: string },
  statusCode: number,
  res: Response
): void => {
  const token = generateToken({
    userId: user._id,
    email: user.email,
    role: user.role
  });
  
  const cookieExpires = parseInt(process.env.JWT_COOKIE_EXPIRES_IN || '7');
  const options = {
    expires: new Date(Date.now() + cookieExpires * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const
  };
  
  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
};
