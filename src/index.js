import { APP_NAME, DEBUG_MODE, TEST_MODE } from '../project.config';
import { LogLevel, Logger, createElementAppender } from './helpers/logger';
import $ from 'jquery';
import alert from './components/alert';
import button from './components/button';
import consolePanel from './components/console-panel';
import dataCson from './data/dummy-data.cson';
import dataCsv from './data/dummy-data.csv';
import dataJson from './data/dummy-data.json5';
import dataXml from './data/dummy-data.xml';
import logo from './components/logo-image';
import text from './components/text';

export function loadPage() {
  // Build page.
  $('#main')
    .empty()
    .append(alert(`Hello '${APP_NAME}'!`))
    .append(text('requiredField', 'Required Field', true))
    .append(logo())
    .append(button('Test', test))
    .append('<hr>')
    .append(consolePanel());

  // Setup logger.
  const logger = new Logger('main', LogLevel.info, createElementAppender());
  logger.info(`debugMode: ${DEBUG_MODE}`);
  logger.info(`logger.isDebugEnabled: ${logger.isDebugEnabled}`);

  // Testing...
  function validateForm($form) {
    const isValid = $form[0].checkValidity();
    if (isValid) {
      $form.removeClass('was-validated');
      $form[0].reset();
    }
    else {
      $form.addClass('was-validated');
    }

    return isValid;
  }

  function test($button) {
    const isValid = validateForm($button.closest('form'));
    if (isValid) {
      logger.info('Test button clicked!');
      logger.info('data (CSV):', dataCsv);
      logger.info('data (CSON):', dataCson);
      logger.info('data (JSON):', dataJson);
      logger.info('data (XML):', dataXml);
    }
  }
}

if (!TEST_MODE) {
  loadPage();
}
