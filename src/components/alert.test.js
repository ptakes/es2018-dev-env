import '../../build/test-setup';
import alert from './alert';

describe('Alert Component', () => {
  it('should returns an alert panel with a message', () => {
    alert('message').should.have.text('message');
  });

  it('should be a primary alert', () => {
    const $alert = alert('message');
    $alert.should.have.class('alert');
    $alert.should.have.class('alert-primary');
  });

  it('should have ARIA-role `alert`', () => {
    alert('message').should.have.attr('role', 'alert');
  });
});
