import { sinon } from '../../build/test-setup';
import button from './button'; // eslint-disable-line

describe('Button Component', () => {
  it('should returns a button', () => {
    button('click me').should.have.text('click me');
  });

  it('should be a primary button', () => {
    const $button = button('message');
    $button.should.have.class('btn');
    $button.should.have.class('btn-primary');
  });

  it('should invoke handler when clicked', () => {
    const handler = sinon.fake();
    button('message', handler).trigger('click');
    handler.should.have.been.calledOnce;
  });
});
