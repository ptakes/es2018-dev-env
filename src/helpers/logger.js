import $ from 'jquery';
import { DEBUG_MODE } from '../../project.config';
import Enum from './enum';

/**
  @typedef LogLevelEnum
  @type {object}
  @property {number} _
  @property {number} none No Messages
  @property {number} error Error Messages
  @property {number} warn Warning Messages
  @property {number} info Informational Messages
  @property {number} debug Debug Messages
 */

/**
 * Logging severity levels.
 * @enum {number}
 * @type {LogLevelEnum}
 */
export const LogLevel = Enum(['none', 'error', 'warn', 'info', 'debug']);

const defaultLogLevel = DEBUG_MODE ? LogLevel.debug : LogLevel.warn;

/**
 * A logger that logs messages to the console and optional appends the messages to a DOM element.
 */
export class Logger {
  /**
   * Gets the ID of the logger.
   * @return {string} The ID.
   */
  get id() {
    return this._id;
  }

  /**
   * Returns if the logger is in debug mode or not.
   * @return {boolean} true if the logger is in debug mode; otherwise, false.
   */
  get isDebugEnabled() {
    return this._level === LogLevel.debug;
  }

  /**
   * Gets the current log level.
   * @return {LogLevel} The current log level.
   */
  get level() {
    return this._level;
  }

  /**
   * Sets the log  level.
   *
   * @param {LogLevel} level The new log level.
   */
  set level(level) {
    this._level = level;
  }

  /**
   * @constructor
   * @param id The logger ID.
   * @param {LogLevel} [level] The logging severity level.
   * @param {Function} [appenderFn] The appender function.
   */
  constructor(id, level, appenderFn) {
    this._id = id;
    this._appenderFn = appenderFn;
    this._level = Number.isInteger(level) && level >= 0 ? level : defaultLogLevel;
  }

  /**
   * Logs a debug message.
   *
   * @param message The message to log.
   * @param rest The data to log.
   */
  debug(message, ...rest) {
    this._log(LogLevel.debug, message, ...rest);
  }

  /**
   * Logs an error.
   *
   * @param message The message to log.
   * @param rest The data to log.
   */
  error(message, ...rest) {
    this._log(LogLevel.error, message, ...rest);
  }

  /**
   * Logs info.
   *
   * @param message The message to log.
   * @param rest The data to log.
   */
  info(message, ...rest) {
    this._log(LogLevel.info, message, ...rest);
  }

  /**
   * Logs a warning.
   *
   * @param message The message to log.
   * @param rest The data to log.
   */
  warn(message, ...rest) {
    this._log(LogLevel.warn, message, ...rest);
  }

  _log(level, message, ...rest) {
    if (level <= this.level) {
      const levelName = LogLevel[level];
      message = `${levelName.toUpperCase()} [${this.id}] ${message}`;

      console[levelName](message, ...rest); // eslint-disable-line no-console
      if (typeof this._appenderFn === 'function') {
        this._appenderFn(message, ...rest);
      }
    }
  }
}

/**
 * Create an appender that adds logs to an DOM element.
 * @param {string} elementId The ID of the element.
 */
export function createElementAppender(elementId = 'console') {
  return (message, ...rest) => {
    const $console = $(`#${elementId}`);
    const content = $console.val();
    const messages = [...rest].map(item => JSON.stringify(item, null, '  '));
    $console.val(content + (content && '\n') + [message, ...messages].join('\n'));
  };
}
