import { getEnvSafely } from './config';

/**
 * For server-used only
 */
const MONGODB_URI = getEnvSafely('NEXT_MONGODB_URI');

const env = {
  MONGODB_URI,
};

export default env;
