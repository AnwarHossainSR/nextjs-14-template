import mongoose from 'mongoose';

import Env from '@/env';

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached: any = (global as any).mongoose;

if (!cached) {
  // eslint-disable-next-line no-multi-assign
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (!Env.MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(Env.MONGODB_URI, opts).then(mong => {
      return mong;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;

// import mongoose, { connect, connection } from 'mongoose';

// import Env from '@/env';
// import { logInfo } from '@/utils/logger';

// const options: any = {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// };

// const connectDB = async () => {
//   if (!connection.readyState) {
//     connect(Env.MONGODB_URI, options);
//     logInfo(`Connected to  ${Env.MONGODB_URI}`);
//   }
// };

// const disconnectDB = async () => {
//   if (connection.readyState) {
//     connection.close();
//     logInfo('Disconnected from MongoDB');
//   }
// };

// export { connectDB, disconnectDB };
