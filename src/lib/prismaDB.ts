import { PrismaClient } from '@prisma/client';

import env from '@/env';

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var prisma: PrismaClient | undefined;
}

const client = new PrismaClient();
if (env.NODE_ENV !== 'production') globalThis.prisma = client;

export default client;
