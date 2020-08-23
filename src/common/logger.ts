import config from '../config';
import moment from 'moment';

/* import { configure, getLogger, ConsoleAppender, Logger } from 'log4js';

const logger = getLogger();
logger.level = config.loggerLevel; */
const logger = console;

/**
 * 日志输出格式
 * https://github.com/log4js-node/log4js-node/blob/master/docs/layouts.md
 */
const layout = {
  type: 'pattern',
  //pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}'
  pattern: `%[[%d{yyyy-MM-dd hh:mm:ss}{GMT+8}] [%p] %c%] %m`,
};
/* configure({
  appenders: {
    console: { type: 'console', layout },
    log: { type: 'file', filename: 'log.log', layout },
  },
  categories: {
    default: { appenders: config.isDev ? ['console', 'log'] : ['console', 'log'], level: logger.level },
    console: { appenders: ['console'], level: logger.level },
  },
}); */

export class Log {
  private logger = console;
  private categories = {};
  constructor() {}

  level: string;

  log(...args: any[]): void {
    this.logger.log(...args);
  }

  trace(message: any, ...args: any[]): void {
    return this.logger.trace(message, ...args);
  }

  debug(message: any, ...args: any[]): void {
    return this.logger.debug(message, ...args);
  }

  info(message: any, ...args: any[]): void {
    return this.logger.info(message, ...args);
  }

  warn(message: any, ...args: any[]): void {
    return this.logger.warn(message, ...args);
  }

  error(message: any, ...args: any[]): void {
    return this.logger.error(message, ...args);
  }

  getLogger(category: string) {
    if (!this.categories[category]) this.categories[category] = new Log();
    return this.categories[category];
  }
}

export default new Log();
