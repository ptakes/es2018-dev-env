import '../../build/test-setup';
import image from './logo-image';

describe('LogoImage Component', () => {
  it('should returns an image', () => {
    const $image = image();
    $image.should.have.attr('height', '50');
    $image.should.have.attr('width', '50');
    $image.should.have.attr('alt', '');
  });

  it('should be able to set height', () => {
    const $image = image(100);
    $image.should.have.attr('height', '100');
    $image.should.have.attr('width', '50');
  });

  it('should be able to set width', () => {
    const $image = image(undefined, 100);
    $image.should.have.attr('height', '50');
    $image.should.have.attr('width', '100');
  });

  it('should be able to set alt text', () => {
    image(undefined, undefined, 'alt text').should.have.attr('alt');
  });
});
