/* eslint-disable @typescript-eslint/ban-types */
import type { NextApiRequest, NextApiResponse } from 'next';

import { errorTypes } from './error';

// Error handler class
class ErrorHandler extends Error {
  statusCode: number;

  message: string;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;

// Async error catcher middleware

const CatchAsyncErrors =
  (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (error: any) {
      const newError = { ...error }; // create a copy of err object

      if (newError.statusCode === 405) {
        const message = `Method Not Allowed`;
        newError.message = message;
        newError.statusCode = 405;
      } else if (newError.code === 11000) {
        const message = `Duplicate ${Object.keys(newError.keyValue)} Entered`;
        newError.message = message;
        newError.statusCode = 400;
      } else {
        const errResponse = errorTypes(newError);
        newError.message = errResponse.message;
        newError.statusCode = errResponse.statusCode;
      }

      res.status(newError.statusCode).json({
        success: false,
        message: newError.message,
      });
    }
  };

export { CatchAsyncErrors, ErrorHandler };
