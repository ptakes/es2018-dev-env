import { mockBrowser, mockConsole } from '../build/testFramework';
import $ from 'jquery'; // eslint-disable-line sort-imports
import { loadPage } from './main';
import * as settings from '../settings.json';

describe('Index Page', () => {
  mockBrowser();
  mockConsole();

  beforeEach(() => loadPage());

  it('should have a console panel', () => {
    $('#main')
      .find('textarea#console')
      .length.should.equal(1);
  });

  it('should have log messages about debug state', () => {
    console.info.should.have.been.calledWith('INFO [main] settings.debugMode: undefined'); // eslint-disable-line no-console
    console.info.should.have.been.calledWith('INFO [main] settings.logLevel: undefined'); // eslint-disable-line no-console
    console.info.should.have.been.calledWith('INFO [main] logger.isDebugEnabled: false'); // eslint-disable-line no-console

    const lines = $('#console')
      .val()
      .toString()
      .split('\n');
    lines.findIndex(line => line === 'INFO [main] settings.debugMode: undefined').should.not.equal(-1);
    lines.findIndex(line => line === 'INFO [main] settings.logLevel: undefined').should.not.equal(-1);
    lines.findIndex(line => line === 'INFO [main] logger.isDebugEnabled: false').should.not.equal(-1);
  });
});
