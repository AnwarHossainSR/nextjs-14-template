// import dayjs from 'dayjs';
// import logger from 'pino';

// const log = logger({
//   base: {
//     pid: false,
//   },
//   timestamp: () => `,"time":"${dayjs().format()}"`,
// });

// export default log;

import type { Logger } from 'winston';
import winston from 'winston';

const logger: Logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'application-log/combined.log',
    }),
    new winston.transports.File({
      filename: 'application-log/error.log',
      level: 'error',
    }),
  ],
});

const logInfo = (message: string): void => {
  logger.info({
    message,
  });
};

const logError = (error: Error): void => {
  logger.error({
    message: error.message,
    stack: error.stack,
  });
};

// if (process.env.NODE_ENV !== 'production') {
//   logger.add(
//     new winston.transports.Console({
//       format: winston.format.simple(),
//     })
//   );
// }

export { logError, logInfo };
