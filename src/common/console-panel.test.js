import { mockBrowser } from '../../build/testFramework';
import consolePanel from './console-panel';

describe('ConsolePanel Component', () => {
  mockBrowser();

  it('should returns a readonly textarea with 25 rows', () => {
    const $sut = consolePanel().find('#console');

    $sut.is('[readonly]').should.be.true;
    $sut.attr('rows').should.equal('25');
    $sut.val().should.be.empty;
  });

  it('should be able to set ID', () => {
    const $sut = consolePanel('my-console').find('#my-console');

    $sut.attr('id').should.equal('my-console');
  });

  it('should be able to set rows', () => {
    const $sut = consolePanel(undefined, 10).find('#console');

    $sut.attr('rows').should.equal('10');
  });

  it('should be able to click clear button', () => {
    const $sut = consolePanel().find('#console');

    $sut.val('testing...');
    $sut.val().should.equal('testing...');

    $sut.siblings('#clear-console').trigger('click');
    $sut.val().should.be.empty;
  });
});
