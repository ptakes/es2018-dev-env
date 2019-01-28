import '../../build/test-setup';
import image from './logo-image';

describe('LogoImage Component', () => {
  it('should returns an image', () => {
    const $image = image();
    $image.attr('height').should.equal('50');
    $image.attr('width').should.equal('50');
    $image.attr('alt').should.equal('');
  });

  it('should be able to set height', () => {
    const $image = image(100);
    $image.attr('height').should.equal('100');
    $image.attr('width').should.equal('50');
  });

  it('should be able to set width', () => {
    const $image = image(undefined, 100);
    $image.attr('height').should.equal('50');
    $image.attr('width').should.equal('100');
  });

  it('should be able to set alt text', () => {
    const $image = image(undefined, undefined, 'alt text');
    $image.attr('alt').should.equal('alt text');
  });
});
