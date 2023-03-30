/* eslint-disable @typescript-eslint/ban-types */
import type { NextApiRequest, NextApiResponse } from 'next';

import { logError } from '@/utils/logger';

// Error handler class
class ErrorHandler extends Error {
  statusCode: number;

  message: string;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

export default ErrorHandler;

// Async error catcher middleware

const CatchAsyncErrors =
  (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (error: any) {
      logError(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

export { CatchAsyncErrors, ErrorHandler };
