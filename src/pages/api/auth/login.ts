import { serialize } from 'cookie';
/* eslint-disable consistent-return */
import type { NextApiRequest, NextApiResponse } from 'next';

import UserModel from '@/models/userModel';
import { logInfo } from '@/utils/logger';
import {
  createAccessToken,
  createRefreshToken,
} from '@/utils/mongodb/jwtToken';
import { connectDB } from '@/utils/mongodb/mongodb';
import {
  CatchAsyncErrors,
  ErrorHandler,
} from '@/utils/server/middleware/errorHandle';

const login = CatchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await connectDB();
      const { email, password } = req.body;

      // checking if user has given password and email both

      if (!email || !password) {
        throw new ErrorHandler('Please Enter Email & Password', 400);
      }

      const user = await UserModel.findOne({ email }).select('+password');

      if (!user) throw new ErrorHandler('Invalid email!', 401);

      const isMatch = await user.comparePassword(password);

      if (!isMatch) throw new ErrorHandler('Invalid password!', 401);

      const accessToken = createAccessToken({ userId: user._id });
      const refreshToken = createRefreshToken({ userId: user._id });

      const serialized = serialize('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });

      res.setHeader('Set-Cookie', serialized);

      return res.status(200).json({
        success: true,
        message: 'Login Success!',
        refreshToken,
        accessToken,
      });
    } catch (error: any) {
      logInfo(`login-error: ${error}`);
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
      case 'POST':
        await login(req, res);
        break;
      default:
        throw new ErrorHandler('Method Not Allowed', 405);
    }
  }
);
