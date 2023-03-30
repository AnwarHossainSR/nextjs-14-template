import type { NextApiRequest, NextApiResponse } from 'next';

import UserModel from '@/models/userModel';
import { logInfo } from '@/utils/logger';
import { connectDB } from '@/utils/mongodb/mongodb';
import valid from '@/utils/validations/userValidation';

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();

  try {
    const { name, email, password } = req.body;

    const errMsg = valid(name, email, password);
    if (errMsg) return res.status(400).json({ err: errMsg });

    const user = await UserModel.findOne({ email });
    if (user)
      return res.status(400).json({ err: 'This email already exists.' });

    const newUser = new UserModel({
      name,
      email,
      password,
    });

    await newUser.save();

    return res.status(200).json({ message: 'Register Success!' });
  } catch (err: any) {
    logInfo(err);
    return res.status(500).json({ err: err.message });
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      await register(req, res);
      break;
    default:
      res.status(405).json({ err: 'Method not allowed' });
  }
};
