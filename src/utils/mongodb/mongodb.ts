import { connect, connection } from 'mongoose';

import Env from '@/env';
import { logInfo } from '@/utils/logger';

const options: any = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const connectDB = async () => {
  if (!connection.readyState) {
    connect(Env.MONGODB_URI, options);
    logInfo(`Connected to  ${Env.MONGODB_URI}`);
  }
};

const disconnectDB = async () => {
  if (connection.readyState) {
    connection.close();
    logInfo('Disconnected from MongoDB');
  }
};

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
