import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/* eslint-disable consistent-return */
import UserModel from '@/models/userModel';
import {
  createAccessToken,
  createRefreshToken,
} from '@/utils/mongodb/jwtToken';
import connectDB from '@/utils/mongodb/mongodb';

export async function POST(req: NextRequest) {
  await connectDB();
  const { email, password } = await req.json();

  // checking if user has given password and email both

  if (!email || !password)
    return NextResponse.json(
      { message: 'Please enter email and password!' },
      { status: 400 }
    );

  const user = await UserModel.findOne({ email }).select('+password');

  if (!user)
    return NextResponse.json(
      { message: 'User does not exist!' },
      { status: 400 }
    );

  const isMatch = await user.comparePassword(password);

  if (!isMatch)
    return NextResponse.json({ message: 'Invalid Password!' }, { status: 401 });

  const accessToken = createAccessToken({ userId: user._id });
  const refreshToken = createRefreshToken({ userId: user._id });

  req.cookies.set('accessToken', accessToken);

  return NextResponse.json({ accessToken, refreshToken });
}
