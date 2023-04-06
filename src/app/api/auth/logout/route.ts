/* eslint-disable consistent-return */
import type { NextApiRequest, NextApiResponse } from 'next';

import { logInfo } from '@/utils/logger';
import {
  CatchAsyncErrors,
  ErrorHandler,
} from '@/utils/server/middleware/errorHandle';

const logout = CatchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { accessToken } = req.cookies;
      if (!accessToken) {
        throw new ErrorHandler('Unauthorized', 401);
      }

      res.setHeader('Set-Cookie', [
        `accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
        `refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
      ]);

      return res.status(200).json({
        success: true,
        message: 'Logged out',
      });
    } catch (error: any) {
      logInfo(`logout-error: ${error}`);
      const err = new ErrorHandler(error.message, error.statusCode);
      res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    }
  }
);

export default CatchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
      case 'GET':
        await logout(req, res);
        break;
      default:
        throw new ErrorHandler('Method Not Allowed', 405);
    }
  }
);
