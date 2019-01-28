import { sinon } from '../../build/test-setup';
import button from './button'; // eslint-disable-line

describe('Button Component', () => {
  it('should returns a button', () => {
    const $button = button('click me');
    $button.text().should.equal('click me');
  });

  it('should be a primary button', () => {
    const $button = button('message');
    $button.hasClass('btn').should.be.true;
    $button.hasClass('btn-primary').should.be.true;
  });

  it('should invoke handler when clicked', () => {
    const handler = sinon.fake();
    button('message', handler).trigger('click');
    handler.should.have.been.calledOnce;
  });
});
