import { getEnvSafely } from './config';

/**
 * For server-used only
 */
const MONGODB_URI = getEnvSafely('NEXT_MONGODB_URI');
const ACCESS_TOKEN_SECRET = getEnvSafely('NEXT_ACCESS_TOKEN_SECRET');
const REFRESH_TOKEN_SECRET = getEnvSafely('NEXT_REFRESH_TOKEN_SECRET');

const env = {
  MONGODB_URI,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
};

export default env;
