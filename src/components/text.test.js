import { mockBrowser, should } from '../../build/testFramework';
import text from './text'; // eslint-disable-line sort-imports

describe('Text Component', () => {
  mockBrowser();

  it('should returns a text form field', () => {
    const $sut = text('field1', 'Field 1');

    $sut.hasClass('form-group').should.be.true;
  });

  it('should have label', () => {
    const $sut = text('field1', 'Field 1');
    const $label = $sut.find('>label');

    $label.hasClass('form-control-label').should.be.true;
    $label.attr('for').should.equal('field1');
    $label.text().should.equal('Field 1');
  });

  it('should have text input field', () => {
    const $sut = text('field1', 'Field 1');
    const $input = $sut.find('>input');

    $input.hasClass('form-control').should.be.true;
    $input.attr('type').should.equal('text');
    $input.attr('id').should.equal('field1');
    $input.attr('name').should.equal('field1');
    should.equal($input[0].attributes.getNamedItem('required'), null);
    $input.val().should.be.empty;
  });

  it('should invalid feedback', () => {
    const $sut = text('field1', 'Field 1');
    const $div = $sut.find('>div');

    $div.hasClass('invalid-feedback').should.be.true;
    $div.text().should.equal('Field is required.');
  });

  it('should be able to set required', () => {
    const $sut = text('field1', 'Field 1', true);
    const $input = $sut.find('>input');

    should.not.equal($input[0].attributes.getNamedItem('required'), null);
  });
});
