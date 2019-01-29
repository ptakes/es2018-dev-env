import '../../build/test-setup';
import panel from './console-panel';

describe('ConsolePanel Component', () => {
  it('should returns a readonly textarea with 25 rows', () => {
    const $console = panel().find('#console');
    $console.should.have.attr('readonly');
    $console.should.have.attr('rows', '25');
    $console.should.have.value('');
  });

  it('should be able to set ID', () => {
    panel('my-console').find('#my-console').should.exist;
  });

  it('should be able to set rows', () => {
    panel(undefined, 10)
      .find('#console')
      .should.have.attr('rows', '10');
  });

  it('should be able to click clear button', () => {
    const $panel = panel();
    const $console = $panel.find('#console');

    $console.val('testing...');
    $console.should.have.value('testing...');

    $panel.find('#clear-console').trigger('click');
    $console.should.have.value('');
  });
});
