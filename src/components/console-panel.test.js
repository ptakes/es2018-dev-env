import '../../build/test-setup';
import $ from 'jquery';
import panel from './console-panel';

describe('ConsolePanel Component', () => {
  it('should returns a readonly textarea with 25 rows', () => {
    const $console = panel().find('#console');
    $console.is('[readonly]').should.be.true;
    $console.attr('rows').should.equal('25');
    $console.val().should.equal('');
  });

  it('should be able to set ID', () => {
    const $console = panel('my-console').find('#my-console');
    $console.length.should.equal(1);
  });

  it('should be able to set rows', () => {
    const $console = panel(undefined, 10).find('#console');
    $console.attr('rows').should.equal('10');
  });

  it('should be able to click clear button', () => {
    const $panel = panel();
    $('body').append($panel);

    const $console = $panel.find('#console');
    $console.val('testing...');
    $console.val().should.equal('testing...');

    const $clearButton = $panel.find('#clear-console');
    $clearButton.trigger('click');
    $console.val().should.equal('');
  });
});
