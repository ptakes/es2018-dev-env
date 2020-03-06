import './styles.scss';
import 'bootstrap';
import { LogLevel, Logger, createElementAppender } from './common/logger';
import $ from 'jquery';
import * as settings from '../settings.json';
import consolePanel from './common/console-panel';

export function loadPage() {
  $('#main').append(consolePanel());

  const logger = new Logger('main', LogLevel.info, createElementAppender());
  logger.info(`settings.debugMode: ${settings.debugMode}`);
  logger.info(`settings.logLevel: ${settings.logLevel}`);
  logger.info(`logger.isDebugEnabled: ${logger.isDebugEnabled}`);
}

if (!settings.testMode) {
  loadPage();
}
