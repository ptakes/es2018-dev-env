import { mockBrowser } from '../../build/test-setup';
import image from './logo-image'; // eslint-disable-line sort-imports

describe('LogoImage Component', () => {
  mockBrowser();

  it('should returns an image', () => {
    const $sut = image();

    $sut.attr('height').should.equal('50');
    $sut.attr('width').should.equal('50');
    $sut.attr('alt').should.be.empty;
  });

  it('should be able to set height', () => {
    const $sut = image(100);

    $sut.attr('height').should.equal('100');
    $sut.attr('width').should.equal('50');
  });

  it('should be able to set width', () => {
    const $sut = image(undefined, 100);

    $sut.attr('height').should.equal('50');
    $sut.attr('width').should.equal('100');
  });

  it('should be able to set alt text', () => {
    const $sut = image(undefined, undefined, 'alt text');

    $sut.attr('alt').should.equal('alt text');
  });
});
