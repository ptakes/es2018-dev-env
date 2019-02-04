import { mockBrowser, mockConsole } from '../build/testFramework';
import $ from 'jquery'; // eslint-disable-line sort-imports
import { loadPage } from './index';

describe('Index Page', () => {
  mockBrowser();
  mockConsole();

  beforeEach(() => loadPage());

  it('should have an alert', () => {
    $('#main')
      .find('.alert')
      .should.have.lengthOf(1);
  });

  it('should have a required text field', () => {
    $('#main')
      .find('#requiredField')
      .should.have.lengthOf(1);
  });

  it('should have a logo image', () => {
    $('#main')
      .find('img')
      .should.have.lengthOf(1);
  });

  it('should have a test button', () => {
    $('#main')
      .find('button:contains("Test")')
      .should.have.lengthOf(1);
  });

  it('should have a console panel', () => {
    $('#main')
      .find('textarea#console')
      .length.should.equal(1);
  });

  it('should have log messages about debug state', () => {
    console.info.should.have.been.calledWith('INFO [main] debugMode: true'); // eslint-disable-line no-console
    console.info.should.have.been.calledWith('INFO [main] logger.isDebugEnabled: false'); // eslint-disable-line no-console

    const lines = $('#console')
      .val()
      .split('\n');
    lines.findIndex(line => line === 'INFO [main] debugMode: true').should.not.equal(-1);
    lines.findIndex(line => line === 'INFO [main] logger.isDebugEnabled: false').should.not.equal(-1);
  });

  it('should add log messages when test button is clicked', () => {
    $('#requiredField').val('some text');
    $('button:contains("Test")').trigger('click');
    console.info.should.have.callCount(7); // eslint-disable-line no-console
    console.info.should.have.been.calledWith('INFO [main] Test button clicked!'); // eslint-disable-line no-console

    const lines = $('#console')
      .val()
      .split('\n');
    lines.findIndex(line => line === 'INFO [main] Test button clicked!').should.not.equal(-1);
  });

  it('should not add log messages when test button is clicked and required field is not set', () => {
    $('button:contains("Test")').trigger('click');
    console.info.should.have.callCount(2); // eslint-disable-line no-console
    console.info.should.have.not.been.calledWith('INFO [main] Test button clicked!'); // eslint-disable-line no-console

    const lines = $('#console')
      .val()
      .split('\n');
    lines.findIndex(line => line === 'INFO [main] Test button clicked!').should.equal(-1);
  });
});
