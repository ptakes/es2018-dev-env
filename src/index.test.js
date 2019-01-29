import '../build/test-setup';
import $ from 'jquery';
import { loadPage } from './index';

describe('Index Page', () => {
  beforeEach(() => loadPage());

  it('should have an alert', () => {
    $('#main').find('.alert').should.exist;
  });

  it('should have an logo image', () => {
    $('#main').find('img').should.exist;
  });

  it('should have an test button', () => {
    $('#main').find('button:contains("Test")').should.exist;
  });

  it('should have an console panel', () => {
    $('#main').find('textarea#console').should.exist;
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
    $('button:contains("Test")').trigger('click');
    console.info.should.have.callCount(7); // eslint-disable-line no-console
    console.info.should.have.been.calledWith('INFO [main] Test button clicked!'); // eslint-disable-line no-console

    const lines = $('#console')
      .val()
      .split('\n');
    lines.findIndex(line => line === 'INFO [main] Test button clicked!').should.not.equal(-1);
  });
});
