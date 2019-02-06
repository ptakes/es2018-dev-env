import { mockBrowser, sinon } from '../../build/testFramework';
import button from './button';

describe('Button Component', () => {
  mockBrowser();

  it('should returns a button', () => {
    const $sut = button('click me');

    $sut.text().trim().should.equal('click me');
  });

  it('should be a primary button', () => {
    const $sut = button('message');

    $sut.hasClass('btn').should.be.true;
    $sut.hasClass('btn-primary').should.be.true;
  });

  it('should invoke handler when clicked', () => {
    const handler = sinon.fake();
    button('message', handler).trigger('click');
    handler.should.have.been.calledOnce;
  });
});
