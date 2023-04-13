/* eslint-disable consistent-return */

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import UserModel from '@/models/userModel';
import { logInfo } from '@/utils/logger';
import { verifyAccessToken } from '@/utils/mongodb/jwtToken';

export async function whoami(request: NextRequest) {
  try {
    const accessToken = request.headers.get('authorization')?.split(' ')[1];

    if (!accessToken)
      NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const isVerified = verifyAccessToken(accessToken);

    if (!isVerified)
      NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { userId } = isVerified as { userId: string };

    const user = await UserModel.findById(userId);
    if (!user)
      NextResponse.json({ message: 'User not found' }, { status: 400 });

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error: any) {
    logInfo(`whoami-error: ${error}`);
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode }
    );
  }
}
