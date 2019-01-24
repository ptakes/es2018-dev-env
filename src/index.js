import { APP_NAME, DEBUG } from '../build/config';
import { LogLevel, Logger } from './helpers/logger';
import $ from 'jquery';
import alert from './components/alert';
import button from './components/button';
import consolePanel from './components/console-panel';

$('#main').append(alert(`Hello '${APP_NAME}'!`));
$('#main').append(button('Test', test));
$('#main').append('<hr>');
$('#main').append(consolePanel());

const logger = new Logger('main', LogLevel.info, logAppender);
logger.info(`debugMode: ${DEBUG}`);
logger.info(`logger.isDebugEnabled: ${logger.isDebugEnabled}`);

function logAppender(message, ...rest) {
  const $console = $('#console');
  const content = $console.val();
  const messages = [...rest].map(item => JSON.stringify(item, null, '  '));
  $console.val(content + (content && '\r\n') + [message, ...messages].join('\r\n'));
}

function test() {
  logger.info(`Test button clicked!`);
}
