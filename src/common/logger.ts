import config from '../config';
import moment from 'moment';
import '@capacitor/core';

/**
 * 日志输出格式
 * https://github.com/log4js-node/log4js-node/blob/master/docs/layouts.md
 */
/* const layout = {
  type: 'pattern',
  //pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}'
  pattern: `%[[%d{yyyy-MM-dd hh:mm:ss}{GMT+8}] [%p] %c%] %m`,
}; */
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

const L = {
  debug: console.debug,
  log: console.log,
  info: console.info,
  warn: console.warn,
  error: console.error,
  trace: console.trace,
};
const Level = {
  debug: 1,
  log: 2,
  info: 3,
  warn: 4,
  error: 5,
  trace: 6,
};

console.log = function (...args) {
  output.bind(console)('log', ...args);
};
console.debug = function (...args) {
  output.bind(console)('debug', ...args);
};
console.info = function (...args) {
  output.bind(console)('info', ...args);
};
console.warn = function (...args) {
  output.bind(console)('warn', ...args);
};
console.error = function (...args) {
  output.bind(console)('error', ...args);
};
console.trace = function (...args) {
  output.bind(console)('trace', ...args);
};
function output(level, ...args) {
  try {
    let l = Level[level] || Level.info;
    let maxL = Level[config.loggerLevel] || Level.info;
    let f = L[level] || L.log;
    l >= maxL && f(`%c[${moment().format('YYYY-MM-DD hh:mm:ss')}] [${level.toUpperCase()}]`, 'color:#1c8d0b', ...args);
  } catch (err) {
    L.error(err.stack);
  }
}

export class Logger {
  readonly level = config.loggerLevel;
  constructor() {}

  log(...args: any[]): Logger {
    console.log(...args);
    return this;
  }

  trace(...args: any[]): Logger {
    console.trace(...args);
    return this;
  }

  debug(...args: any[]): Logger {
    console.debug(...args);
    return this;
  }

  info(...args: any[]): Logger {
    console.info(...args);
    return this;
  }

  warn(...args: any[]): Logger {
    console.warn(...args);
    return this;
  }

  error(...args: any[]): Logger {
    console.error(...args);
    return this;
  }
}

const logger = new Logger();
window['logger'] = logger;
export default logger;
