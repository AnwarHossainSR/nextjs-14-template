import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

/* eslint-disable consistent-return */
import UserModel from '@/models/userModel';
import { logInfo } from '@/utils/logger';
import {
  createAccessToken,
  createRefreshToken,
} from '@/utils/mongodb/jwtToken';
import connectDB from '@/utils/mongodb/mongodb';

export async function POST(req: Request) {
  try {
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
      return NextResponse.json(
        { message: 'Invalid Password!' },
        { status: 401 }
      );

    const accessToken = createAccessToken({ userId: user._id });
    const refreshToken = createRefreshToken({ userId: user._id });

    const serialized = serialize('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });

    // NextResponse.setHeader('Set-Cookie', serialized);
    // const requestHeaders = new Headers(req.headers);
    // requestHeaders.set('Set-Cookie', serialized);
    // NextResponse.next({
    //   request: {
    //     headers: requestHeaders,
    //   },
    // });
    req.headers.set('Set-Cookie', serialized);

    return NextResponse.json({
      message: 'Login Success!',
      accessToken,
      refreshToken,
    });
  } catch (err: any) {
    logInfo(`login-error: ${err.message} ${err.statusCode} ${err.stack}`);
    return NextResponse.json(
      { message: err.message },
      { status: err.statusCode }
    );
  }
}
