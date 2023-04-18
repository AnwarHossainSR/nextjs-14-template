import bcrypt from 'bcrypt';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import prisma from '@/lib/prismaDB';

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password)
    return NextResponse.json(
      {
        success: false,
        message: 'Please provide all fields',
      },
      { status: 400 }
    );

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

  // password hashing

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
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
