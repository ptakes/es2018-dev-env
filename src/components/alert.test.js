import '../../build/test-setup';
import alert from './alert';

describe('Alert Component', () => {
  it('should returns an alert panel with a message', () => {
    const $alert = alert('message');
    $alert.text().should.equal('message');
  });

  it('should be a primary alert', () => {
    const $alert = alert('message');
    $alert.hasClass('alert').should.be.true;
    $alert.hasClass('alert-primary').should.be.true;
  });

  it('should have ARIA-role `alert`', () => {
    const $alert = alert('message');
    $alert.attr('role').should.equal('alert');
  });
});
