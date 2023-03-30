import type { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line import/no-unresolved
import Users from '@/models/user.model';
import {
  createAccessToken,
  createRefreshToken,
} from '@/utils/mongodb/generateToken';
import { connectDB, disconnectDB } from '@/utils/mongodb/mongodb';

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user)
      return res.status(400).json({ err: 'This user does not exist.' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ err: 'Incorrect password.' });

    const accessToken = createAccessToken({ userId: user._id });
    const refreshToken = createRefreshToken({ userId: user._id });

    res.setHeader('Set-Cookie', [
      `refreshToken=${refreshToken}; path=/; httpOnly; max-age=2592000`,
    ]);

    await disconnectDB();

    return res.json({
      message: 'Login Success!',
      refreshToken,
      accessToken,
      user: {
        name: user.name,
        email: user.email,
        role: user.isAdmin,
      },
    });
  } catch (err: any) {
    return res.status(500).json({ err: err.message });
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      await login(req, res);
      break;
    default:
      res.status(405).json({ err: 'Method not allowed' });
  }
};
