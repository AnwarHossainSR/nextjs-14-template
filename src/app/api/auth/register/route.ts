import { NextResponse } from 'next/server';

import UserModel from '@/models/userModel';
import { logInfo } from '@/utils/logger';
import connectDB from '@/utils/mongodb/mongodb';
import { ErrorHandler } from '@/utils/server/middleware/errorHandle';
import valid from '@/utils/validations/userValidation';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

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

    return NextResponse.json({ message: 'Register Success!' });
  } catch (err: any) {
    logInfo(`register-error: ${err}`);
    const error = new ErrorHandler(err.message, err.statusCode);
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode }
    );
  }
}
