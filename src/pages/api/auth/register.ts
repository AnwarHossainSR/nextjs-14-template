import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';

import Users from '@/models/user.model';
import { connectDB, disconnectDB } from '@/utils/mongodb/mongodb';
import valid from '@/utils/validations/userValidation';

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();

  try {
    const { name, email, password } = req.body;

    const errMsg = valid(name, email, password);
    if (errMsg) return res.status(400).json({ err: errMsg });

    const user = await Users.findOne({ email });
    if (user)
      return res.status(400).json({ err: 'This email already exists.' });

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = new Users({
      name,
      email,
      password: passwordHash,
    });

    await newUser.save();

    await disconnectDB();

    return res.json({ message: 'Register Success!' });
  } catch (err: any) {
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
