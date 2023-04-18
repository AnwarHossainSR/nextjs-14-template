import { getEnvSafely } from './config';

/**
 * For server-used only
 */
const MONGODB_URI = getEnvSafely('MONGODB_URI');
const ACCESS_TOKEN_SECRET = getEnvSafely('ACCESS_TOKEN_SECRET');
const REFRESH_TOKEN_SECRET = getEnvSafely('REFRESH_TOKEN_SECRET');
const GITHUB_ID = getEnvSafely('GITHUB_ID');
const GITHUB_SECRET = getEnvSafely('GITHUB_SECRET');
const GOOGLE_CLIENT_ID = getEnvSafely('GOOGLE_CLIENT_ID');
const GOOGLE_CLIENT_SECRET = getEnvSafely('GOOGLE_CLIENT_SECRET');
const NODE_ENV = getEnvSafely('NODE_ENV');
const NEXTAUTH_SECRET = getEnvSafely('NEXTAUTH_SECRET');

const env = {
  MONGODB_URI,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  GITHUB_ID,
  GITHUB_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  NODE_ENV,
  NEXTAUTH_SECRET,
};

export default env;
