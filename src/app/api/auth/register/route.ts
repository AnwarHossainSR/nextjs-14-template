import { NextResponse } from 'next/server';

import UserModel from '@/models/userModel';
import { logInfo } from '@/utils/logger';
import connectDB from '@/utils/mongodb/mongodb';
import valid from '@/utils/validations/userValidation';

export async function POST(req: Request) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    const errMsg = valid(name, email, password);

    if (errMsg) return NextResponse.json({ message: errMsg }, { status: 400 });

    const user = await UserModel.findOne({ email });
    if (user)
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );

    const newUser = new UserModel({
      name,
      email,
      password,
    });

    await newUser.save();

    return NextResponse.json({ message: 'Register Success!' });
  } catch (err: any) {
    logInfo(`register-error: ${err.message} ${err.statusCode} ${err.stack}`);
    return NextResponse.json(
      { message: err.message },
      { status: err.statusCode }
    );
  }
}
