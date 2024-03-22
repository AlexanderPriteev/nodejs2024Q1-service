import { format, transports } from 'winston';
import { env } from 'node:process';
import 'winston-daily-rotate-file';
import 'dotenv/config';

const nestLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  verbose: 5,
};

const LEVEL =
  env.LOGGER_LEVEL === 'log'
    ? 'info'
    : nestLevels[env.LOGGER_LEVEL] || 'verbose';

export const loggerConfig = {
  levels: nestLevels,
  transports: [
    new transports.DailyRotateFile({
      level: 'error',
      filename: './logs/error',
      maxSize: env.LOGGER_SIZE || '1k',
      maxFiles: env.LOGGER_MAX_FILES || '9',
      extension: '.log',
      format: format.combine(format.timestamp(), format.simple()),
    }),
    new transports.DailyRotateFile({
      level: LEVEL,
      filename: './logs/main',
      maxSize: env.LOGGER_SIZE || '1m',
      maxFiles: env.LOGGER_MAX_FILES || '9',
      extension: '.log',
      format: format.combine(format.timestamp(), format.simple()),
    }),
    new transports.Console({
      format: format.combine(
        format.timestamp(),
        format.colorize(),
        format.simple(),
      ),
      level: LEVEL,
    } as any),
  ],
};
