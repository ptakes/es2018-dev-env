import { APP_NAME, DEBUG } from '../project.config';
import { LogLevel, Logger } from './helpers/logger';
import $ from 'jquery';
import alert from './components/alert';
import button from './components/button';
import consolePanel from './components/console-panel';
import dataCson from './data/dummy-data.cson';
import dataCsv from './data/dummy-data.csv';
import dataJson from './data/dummy-data.json5';
import dataXml from './data/dummy-data.xml';
import logo from './components/logo-image';

// Build page.
$('#main')
  .append(alert(`Hello '${APP_NAME}'!`))
  .append(logo())
  .append(button('Test', test))
  .append('<hr>')
  .append(consolePanel());

// Setup logger.
const logger = new Logger('main', LogLevel.info, logAppender);
logger.info(`debugMode: ${DEBUG}`);
logger.info(`logger.isDebugEnabled: ${logger.isDebugEnabled}`);

function logAppender(message, ...rest) {
  const $console = $('#console');
  const content = $console.val();
  const messages = [...rest].map(item => JSON.stringify(item, null, '  '));
  $console.val(content + (content && '\r\n') + [message, ...messages].join('\r\n'));
}

// Testing...
function test() {
  logger.info(`Test button clicked!`);
  logger.info('data (CSV):', dataCsv);
  logger.info('data (CSON):', dataCson);
  logger.info('data (JSON):', dataJson);
  logger.info('data (XML):', dataXml);
}
