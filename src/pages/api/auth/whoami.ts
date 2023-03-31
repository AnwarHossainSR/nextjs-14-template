/* eslint-disable consistent-return */
import type { NextApiRequest, NextApiResponse } from 'next';

import UserModel from '@/models/userModel';
import { logInfo } from '@/utils/logger';
import { verifyAccessToken } from '@/utils/mongodb/jwtToken';
import {
  CatchAsyncErrors,
  ErrorHandler,
} from '@/utils/server/middleware/errorHandle';

const getAuthenticatedUser = CatchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { accessToken } = req.cookies;

      if (!accessToken) {
        throw new ErrorHandler('Unauthorized', 401);
      }

      const isVerified = verifyAccessToken(accessToken);

      if (!isVerified) {
        throw new ErrorHandler('Unauthorized', 401);
      }

      const { userId } = isVerified as { userId: string };

      const user = await UserModel.findById(userId);
      if (!user) {
        throw new ErrorHandler('User not found', 401);
      }

      return res.status(200).json({
        success: true,
        message: 'Authenticated',
        user,
      });
    } catch (error: any) {
      logInfo(`whoami-error: ${error}`);
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
        await getAuthenticatedUser(req, res);
        break;
      default:
        throw new ErrorHandler('Method Not Allowed', 405);
    }
  }
);
