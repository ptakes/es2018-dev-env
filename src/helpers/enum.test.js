import '../../build/testFramework';
import Enum from './enum';

describe('Enum', () => {
  it('should accept array', () => {
    const sut = Enum(['alpha', 'beta', 'gamma']);

    sut.alpha.should.equal(0);
    sut[sut.alpha].should.to.equal('alpha');

    sut.beta.should.to.equal(1);
    sut[sut.beta].should.to.equal('beta');

    sut.gamma.should.to.equal(2);
    sut[sut.gamma].should.to.equal('gamma');
  });

  it('should accept object', () => {
    const sut = Enum({
      alpha: 2,
      beta: 4,
      gamma: 6
    });

    sut.alpha.should.equal(2);
    sut[sut.alpha].should.equal('alpha');

    sut.beta.should.equal(4);
    sut[sut.beta].should.equal('beta');

    sut.gamma.should.equal(6);
    sut[sut.gamma].should.equal('gamma');
  });

  it('should accept object with partial predefined values', () => {
    const sut = Enum({
      alpha: undefined,
      beta: 5,
      gamma: undefined
    });

    sut.alpha.should.equal(0);
    sut[sut.alpha].should.equal('alpha');

    sut.beta.should.equal(5);
    sut[sut.beta].should.equal('beta');

    sut.gamma.should.equal(6);
    sut[sut.gamma].should.equal('gamma');
  });

  it('should accept non array or object', () => {
    const sut = Enum('value');

    sut.value.should.equal(0);
  });

  it('should be immutable', () => {
    const sut = Enum(['alpha', 'beta', 'gamma']);

    sut.should.be.frozen;
  });
});
