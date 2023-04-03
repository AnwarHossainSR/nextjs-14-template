import type { NextApiRequest, NextApiResponse } from 'next';

import UserModel from '@/models/userModel';
import { logInfo } from '@/utils/logger';
import { connectDB } from '@/utils/mongodb/mongodb';
import {
  CatchAsyncErrors,
  ErrorHandler,
} from '@/utils/server/middleware/errorHandle';
import valid from '@/utils/validations/userValidation';

const register = CatchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    await connectDB();

    try {
      const { name, email, password } = req.body;

      const errMsg = valid(name, email, password);

      if (errMsg) throw new ErrorHandler(errMsg, 400);

      const user = await UserModel.findOne({ email });
      if (user) throw new ErrorHandler('This email already exists.', 400);

      const newUser = new UserModel({
        name,
        email,
        password,
      });

      await newUser.save();

      return res.status(200).json({ message: 'Register Success!' });
    } catch (err: any) {
      logInfo(`register-error: ${err}`);
      return res.status(500).json({ err: err.message });
    }
  }
);

export default CatchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
      case 'POST':
        await register(req, res);
        break;
      default:
        res.status(405).json({ err: 'Method not allowed' });
    }
  }
);
