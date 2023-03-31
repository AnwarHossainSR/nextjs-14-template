import jwt from 'jsonwebtoken';

import Env from '@/env';

interface TokenPayload {
  userId: string;
}

export const createAccessToken = (payload: TokenPayload) => {
  return jwt.sign(payload, Env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
};

export const createRefreshToken = (payload: TokenPayload) => {
  return jwt.sign(payload, Env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};

export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, Env.ACCESS_TOKEN_SECRET);
  } catch (error: any) {
    return null;
  }
};
