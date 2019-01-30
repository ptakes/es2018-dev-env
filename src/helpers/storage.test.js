import { Storage, StorageType } from './storage';
import { mockStorage, should } from '../../build/test-setup';

describe('StorageType', () => {
  it('should be an enum', () => {
    StorageType.local.should.equal(0);
    StorageType[StorageType.local].should.equal('local');

    StorageType.session.should.equal(1);
    StorageType[StorageType.session].should.equal('session');
  });
});

describe('Storage', () => {
  mockStorage();

  it('should have container name set', () => {
    const sut = new Storage('test');

    sut.container.should.equal('test');
  });

  it('should be empty upon first usage', () => {
    const sut = new Storage('test');

    sut.count.should.equal(0);
    sut.keys().should.have.all.members([]);
    sut.values().should.have.all.members([]);
  });

  it('should have local storage as default storage', () => {
    const sut = new Storage('test');

    sut._storage.should.equal(global.localStorage);
  });

  it('should set storage type to local', () => {
    const sut = new Storage('test', StorageType.local);

    sut._storage.should.equal(global.localStorage);
  });

  it('should set storage type to session', () => {
    const sut = new Storage('test', StorageType.session);

    sut._storage.should.equal(global.sessionStorage);
  });

  it('should return null for not saved values', () => {
    const sut = new Storage('test');

    const value1 = sut.get('value1');

    should.equal(value1, null);
  });

  it('should save a plain value', () => {
    const sut = new Storage('test');

    sut.set('value', 123);

    sut.count.should.equal(1);
    sut.get('value').should.equal(123);
    sut.has('value').should.be.true;
    sut.keys().should.have.all.members(['value']);
    sut.values().should.have.all.members([123]);
  });

  it('should save a Date value', () => {
    const sut = new Storage('test');
    const expected = new Date();

    sut.set('value', expected);

    const actual = sut.get('value');
    actual.should.equalDate(expected);
    actual.should.equalTime(expected);
  });

  it('should save an array value', () => {
    const sut = new Storage('test');
    const value = ['value1', 'value2', 'value3'];

    sut.set('value', value);

    sut.get('value').should.have.all.members(value);
  });

  it('should save an object value', () => {
    const sut = new Storage('test');
    const expected = {
      value1: 1,
      value2: true,
      value3: 'text',
      value4: new Date()
    };
    sut.set('value', expected);

    const actual = sut.get('value');

    actual.should.have.keys(['value1', 'value2', 'value3', 'value4']);
    actual.value1.should.equal(expected.value1);
    actual.value2.should.equal(expected.value2);
    actual.value3.should.equal(expected.value3);
    actual.value4.should.equalDate(expected.value4);
    actual.value4.should.equalTime(expected.value4);
  });

  it('should delete a saved value', () => {
    const sut = new Storage('test');
    sut.set('value1', 1);
    sut.set('value2', 2);
    sut.set('value3', 3);
    sut.set('value4', 4);

    sut.delete('value3').should.equal(3);

    sut.has('value3').should.be.false;
    sut.count.should.equal(3);
    sut.keys().should.have.all.members(['value1', 'value2', 'value4']);
    sut.values().should.have.all.members([1, 2, 4]);
  });

  it('should clear the container', () => {
    const container1 = new Storage('test1');
    container1.set('value1', 1);
    container1.set('value2', true);
    container1.set('value3', new Date());
    container1.set('value4', 'text');

    const container2 = new Storage('test2');
    container2.set('value1', 789);

    container1.clear();
    container1.count.should.equal(0);
    container1.keys().should.have.all.members([]);
    container1.values().should.have.all.members([]);

    container2.count.should.equal(1);
    container2.get('value1').should.equal(789);
  });

  it('should access the same container', () => {
    const container1 = new Storage('test');
    const container2 = new Storage('test');
    container1.set('value', 'container');

    container1.get('value').should.equal('container');
    container2.get('value').should.equal('container');
  });

  it('should access different containers', () => {
    const container1 = new Storage('test1');
    const container2 = new Storage('test2');
    container1.set('value', 'container1');
    container2.set('value', 'container2');

    container1.get('value').should.equal('container1');
    container2.get('value').should.equal('container2');
  });
});
