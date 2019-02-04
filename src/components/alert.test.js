import { faker, mockBrowser } from '../../build/testFramework';
import alert from './alert'; // eslint-disable-line sort-imports

describe('Alert Component', () => {
  mockBrowser();

  it('should returns an alert panel with a message', () => {
    const message = faker.lorem.words(3);
    const $sut = alert(message);

    $sut.text().should.equal(message);
  });

  it('should be a primary alert', () => {
    const message = faker.lorem.words(3);
    const $sut = alert(message);

    $sut.hasClass('alert').should.be.true;
    $sut.hasClass('alert-primary').should.be.true;
  });

  it('should have ARIA-role `alert`', () => {
    const message = faker.lorem.words(3);
    const $sut = alert(message);

    $sut.attr('role').should.equal('alert');
  });
});
