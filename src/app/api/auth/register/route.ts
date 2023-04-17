import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDB';

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  const userExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExist)
    return NextResponse.json(
      {
        success: false,
        message: 'User already exists',
      },
      { status: 409 }
    );

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });

  return NextResponse.json(
    {
      success: true,
      message: 'User created successfully',
      user,
    },
    { status: 201 }
  );
}
