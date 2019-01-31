import { LogLevel, Logger } from './logger';
import { mockConsole, sinon } from '../../build/testFramework';

describe('LogLevel', () => {
  it('should be an enum', () => {
    LogLevel.none.should.equal(0);
    LogLevel[LogLevel.none].should.equal('none');

    LogLevel.error.should.equal(1);
    LogLevel[LogLevel.error].should.equal('error');

    LogLevel.warn.should.equal(2);
    LogLevel[LogLevel.warn].should.equal('warn');

    LogLevel.info.should.equal(3);
    LogLevel[LogLevel.info].should.equal('info');

    LogLevel.debug.should.equal(4);
    LogLevel[LogLevel.debug].should.equal('debug');
  });
});

describe('Logger', () => {
  mockConsole();

  it('should have ID set', () => {
    const sut = new Logger('TEST');

    sut.id.should.equal('TEST');
  });

  it('should have default level set to debug', () => {
    const sut = new Logger('TEST');

    sut.level.should.equal(LogLevel.debug);
  });

  it('should have level set with constructor', () => {
    const sut = new Logger('TEST', LogLevel.info);

    sut.level.should.equal(LogLevel.info);
  });

  it('should have level set with property', () => {
    const sut = new Logger('TEST');
    sut.level = LogLevel.error;

    sut.level.should.equal(LogLevel.error);
  });

  it('should have isDebugEnabled set to true when level is debug', () => {
    const sut = new Logger('TEST', LogLevel.debug);

    sut.isDebugEnabled.should.be.true;
  });

  it('should have isDebugEnabled set to false when level is not debug', () => {
    const sut = new Logger('TEST', LogLevel.warn);

    sut.isDebugEnabled.should.be.false;
  });

  it('should write debug message to console and appender', () => {
    const appender = sinon.spy();
    const sut = new Logger('TEST', LogLevel.debug, appender);

    sut.debug('message');

    console.debug.should.have.been.calledWith('DEBUG [TEST] message'); // eslint-disable-line no-console
    appender.should.have.been.calledWith('DEBUG [TEST] message');
  });

  it('should write info message to console and appender', () => {
    const appender = sinon.spy();
    const sut = new Logger('TEST', LogLevel.debug, appender);

    sut.info('message');

    console.info.should.have.been.calledWith('INFO [TEST] message'); // eslint-disable-line no-console
    appender.should.have.been.calledWith('INFO [TEST] message');
  });

  it('should write warn message to console and appender', () => {
    const appender = sinon.spy();
    const sut = new Logger('TEST', LogLevel.debug, appender);

    sut.warn('message');

    console.warn.should.have.been.calledWith('WARN [TEST] message'); // eslint-disable-line no-console
    appender.should.have.been.calledWith('WARN [TEST] message');
  });

  it('should write error message to console and appender', () => {
    const appender = sinon.spy();
    const sut = new Logger('TEST', LogLevel.debug, appender);

    sut.error('message');

    console.error.should.have.been.calledWith('ERROR [TEST] message'); // eslint-disable-line no-console
    appender.should.have.been.calledWith('ERROR [TEST] message');
  });

  it('should write messages with extra data to console and appender', () => {
    const appender = sinon.spy();
    const sut = new Logger('TEST', LogLevel.debug, appender);

    sut.debug('message', 'extra1', 'extra2');
    sut.info('message', 'extra1', 'extra2');
    sut.warn('message', 'extra1', 'extra2');
    sut.error('message', 'extra1', 'extra2');

    console.debug.should.have.been.calledWith('DEBUG [TEST] message', 'extra1', 'extra2'); // eslint-disable-line no-console
    console.info.should.have.been.calledWith('INFO [TEST] message', 'extra1', 'extra2'); // eslint-disable-line no-console
    console.warn.should.have.been.calledWith('WARN [TEST] message', 'extra1', 'extra2'); // eslint-disable-line no-console
    console.error.should.have.been.calledWith('ERROR [TEST] message', 'extra1', 'extra2'); // eslint-disable-line no-console

    appender.should.have.been.calledWith('DEBUG [TEST] message', 'extra1', 'extra2'); // eslint-disable-line no-console
    appender.should.have.been.calledWith('INFO [TEST] message', 'extra1', 'extra2'); // eslint-disable-line no-console
    appender.should.have.been.calledWith('WARN [TEST] message', 'extra1', 'extra2'); // eslint-disable-line no-console
    appender.should.have.been.calledWith('ERROR [TEST] message', 'extra1', 'extra2'); // eslint-disable-line no-console
  });

  it('should write no messages to console when level is none', () => {
    const sut = new Logger('TEST', LogLevel.none);

    sut.debug('message');
    sut.info('message');
    sut.warn('message');
    sut.error('message');

    console.debug.should.have.callCount(0); // eslint-disable-line no-console
    console.info.should.have.callCount(0); // eslint-disable-line no-console
    console.warn.should.have.callCount(0); // eslint-disable-line no-console
    console.error.should.have.callCount(0); // eslint-disable-line no-console
  });

  it('should only write messages to console with lower level', () => {
    const sut = new Logger('TEST', LogLevel.warn);

    sut.debug('message');
    sut.info('message');
    sut.warn('message');
    sut.error('message');

    console.debug.should.have.callCount(0); // eslint-disable-line no-console
    console.info.should.have.callCount(0); // eslint-disable-line no-console
    console.warn.should.have.been.calledWith('WARN [TEST] message'); // eslint-disable-line no-console
    console.error.should.have.been.calledWith('ERROR [TEST] message'); // eslint-disable-line no-console
  });
});
