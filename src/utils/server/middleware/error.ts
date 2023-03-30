import type { NextApiRequest, NextApiResponse } from 'next';

import type { ErrorHandler } from '@/utils/server/middleware/errorHandle';

const errorHandlerMiddleware = (
  err: ErrorHandler,
  _req: NextApiRequest,
  res: NextApiResponse
) => {
  const error = { ...err }; // create a copy of err object

  error.statusCode = error.statusCode || 500;
  error.message = error.message || 'Internal Server Error';

  // Wrong Mongodb Id error
  if (error.name === 'CastError') {
    const message = `Resource not found. Invalid: ${error.path}`;
    error.message = message;
    error.statusCode = 400;
  }

  // Mongoose duplicate key error
  if (error.code === 11000) {
    const message = `Duplicate ${Object.keys(error.keyValue)} Entered`;
    error.message = message;
    error.statusCode = 400;
  }

  // Wrong JWT error
  if (error.name === 'JsonWebTokenError') {
    const message = `Json Web Token is invalid, Try again `;
    error.message = message;
    error.statusCode = 400;
  }

  // JWT EXPIRE error
  if (error.name === 'TokenExpiredError') {
    const message = `Json Web Token is Expired, Try again `;
    error.message = message;
    error.statusCode = 400;
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};

export default errorHandlerMiddleware;
