import mongoose from 'mongoose';

import Env from '@/env';
import { logError, logInfo } from '@/utils/logger';

async function connectDB() {
  const dbUri = Env.MONGODB_URI as string;
  try {
    await mongoose.connect(dbUri);
    logInfo('DB connected');
  } catch (error: any) {
    logError(error);
    process.exit(1);
  }
}

async function disconnectDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}

export { connectDB, disconnectDB };

// import mongoose from 'mongoose';

// import Env from '@/env';

// /**
//  * Global is used here to maintain a cached connection across hot reloads
//  * in development. This prevents connections growing exponentially
//  * during API Route usage.
//  */
// type TGlobalWithMongo = typeof global & {
//   mongoose?: any;
// };

// const globalWithMongo = global as TGlobalWithMongo;

// let cached = globalWithMongo.mongoose;

// if (!cached)
//   // eslint-disable-next-line no-multi-assign
//   cached = globalWithMongo.mongoose = { conn: null, promise: null };

// async function connectDB() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     };

//     mongoose.set('strictQuery', false);

//     cached.promise = mongoose
//       .connect(Env.MONGODB_URI as string, opts)
//       .then(mongo => {
//         return mongo;
//       });
//   }

//   try {
//     cached.conn = await cached.promise;
//   } catch (e) {
//     cached.promise = null;
//     throw e;
//   }

//   return cached.conn;
// }

// export default connectDB;
