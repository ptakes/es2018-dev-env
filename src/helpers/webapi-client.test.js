import { mockServer, should } from '../../build/testFramework';
import { HttpStatus, WebApiClient } from './webapi-client'; // eslint-disable-line sort-imports
import { Base64 } from 'js-base64';

describe('WebApiClient', () => {
  describe('constructor', () => {
    it('should set default server URL', () => {
      const sut = new WebApiClient();
      sut.serverUrl.href.should.equal('http://localhost/');
    });

    it('should set server URL', () => {
      const sut = new WebApiClient('https://server/path');
      sut.serverUrl.href.should.equal('https://server/');
    });

    it('should set default API URL', () => {
      const sut = new WebApiClient();
      sut.apiUrl.href.should.equal('http://localhost/api');
    });

    it('should set API URL', () => {
      const sut = new WebApiClient(undefined, { apiUrl: '/api/v2/' });
      sut.apiUrl.href.should.equal('http://localhost/api/v2');
    });

    it('should set server and API URL', () => {
      const sut = new WebApiClient('https://server/path', { apiUrl: '/api/v2/' });
      sut.apiUrl.href.should.equal('https://server/api/v2');
    });

    it('should set absolute API URL', () => {
      const sut = new WebApiClient(undefined, { apiUrl: 'https://server/api/v2' });
      sut.apiUrl.href.should.equal('https://server/api/v2');
    });
  });

  describe('authentication', () => {
    const server = mockServer();

    it('with anonymous call should not set Authorization header', async () => {
      const sut = new WebApiClient(server.url, { password: 'password', username: 'username' });
      await server
        .get('/api/resources/1')
        .withHeaders({ Authorization: `Basic ${Base64.encode('username:password')}` })
        .thenReply(HttpStatus.Forbidden);
      await server.get('/api/resources/1').thenReply(HttpStatus.OK);

      await sut.getAsync('~/resources/1', {}, true).then(response => response, error => should.fail(error.message));
    });

    it('with access token should set Authorization header with Bearer scheme', async () => {
      const sut = new WebApiClient(server.url, { accessToken: 'token', accessTokenExpiresIn: 3600 });
      await server
        .get('/api/resources/1')
        .withHeaders({ Authorization: 'Bearer token' })
        .thenReply(HttpStatus.OK);
      await server.get('/api/resources/1').thenReply(HttpStatus.Forbidden);

      await sut.getAsync('~/resources/1').then(response => response, error => should.fail(error.message));
    });

    it('with expired access token should not set Authorization header', async () => {
      const sut = new WebApiClient(server.url, { accessToken: 'token', accessTokenExpiresIn: 0 });
      await server
        .get('/api/resources/1')
        .withHeaders({ Authorization: 'Bearer token' })
        .thenReply(HttpStatus.Forbidden);
      await server.get('/api/resources/1').thenReply(HttpStatus.OK);

      await sut.getAsync('~/resources/1').then(response => response, error => should.fail(error.message));
    });

    it('with user credentials should set Authorization header with Basic scheme', async () => {
      const sut = new WebApiClient(server.url, { password: 'password', username: 'username' });
      await server
        .get('/api/resources/1')
        .withHeaders({ Authorization: `Basic ${Base64.encode('username:password')}` })
        .thenReply(HttpStatus.OK);
      await server.get('/api/resources/1').thenReply(HttpStatus.Forbidden);

      await sut.getAsync('~/resources/1').then(response => response, error => should.fail(error.message));
    });

    it('with Windows authentication should allow the Authorization header');
  });

  describe('GET', () => {
    const server = mockServer();
    let sut = null;

    beforeEach(() => (sut = new WebApiClient(server.url)));

    it('should return the resource', async () => {
      const expectedPayload = { id: 1 };
      await server.get('/api/resources/1').thenJSON(HttpStatus.OK, expectedPayload);

      const actualPayload = await sut.getAsync('~/resources/1');

      actualPayload.should.eql(expectedPayload);
    });

    it('should return the response headers', async () => {
      const expectedHeaders = { 'X-TestHeader': 'value1' };
      await server.get('/api/resources/1').thenJSON(HttpStatus.OK, undefined, expectedHeaders);

      const actualHeaders = { 'X-TestHeader': null };
      await sut.getAsync('~/resources/1', actualHeaders);

      actualHeaders.should.eql(expectedHeaders);
    });

    it('with query string should return the resource', async () => {
      const expectedPayload = { id: 1 };
      await server
        .get('/api/resources/1')
        .withQuery({ format: '1' })
        .thenJSON(HttpStatus.OK, expectedPayload);

      const actualPayload = await sut.getAsync('~/resources/1?format=1');

      actualPayload.should.eql(expectedPayload);
    });

    it('not-existing resource should throw exception', async () => {
      const expectedPayload = { error: 1234 };
      await server.get('/api/resources/1').thenJSON(HttpStatus.NotFound, expectedPayload);

      const error = await sut.getAsync('~/resources/1').then(() => should.fail('No error thrown.'), error => error);

      error.message.should.equal('404 Not Found');
      error.data.should.eql(expectedPayload);
    });
  });

  describe('POST', () => {
    const server = mockServer();
    let sut = null;

    beforeEach(() => (sut = new WebApiClient(server.url)));

    it('should create a new resource', async () => {
      const expectedPayload = { id: 1 };
      await server.post('/api/resources').thenJSON(HttpStatus.Created, expectedPayload);

      const actualPayload = await sut.postAsync('~/resources');

      actualPayload.should.eql(expectedPayload);
    });

    it('should create a new resource and return the new resource location', async () => {
      const expectedHeaders = { Location: `${sut.apiUrl}/resources/1` };
      await server.post('/api/resources').thenJSON(HttpStatus.Created, undefined, expectedHeaders);

      const actualHeaders = { Location: null };
      await sut.postAsync('~/resources', undefined, actualHeaders);

      actualHeaders.should.eql(expectedHeaders);
    });

    it('with query string should create a new resource', async () => {
      const expectedPayload = { id: 1 };
      await server
        .post('/api/resources')
        .withQuery({ format: '1' })
        .thenReply(HttpStatus.Created, JSON.stringify(expectedPayload));

      const actual = await sut.postAsync('~/resources?format=1');

      actual.should.eql(expectedPayload);
    });

    it('with invalid payload should throw exception', async () => {
      const expectedPayload = { error: 1234 };
      await server.post('/api/resources').thenReply(HttpStatus.BadRequest, JSON.stringify(expectedPayload));

      const error = await sut.postAsync('~/resources').then(() => should.fail('No error thrown.'), error => error);

      error.message.should.equal('400 Bad Request');
      error.data.should.eql(expectedPayload);
    });
  });

  describe('PUT', () => {
    const server = mockServer();
    let sut = null;

    beforeEach(() => (sut = new WebApiClient(server.url)));

    it('should replace an existing resource', async () => {
      const expectedPayload = { id: 1 };
      await server.put('/api/resources/1').thenJSON(HttpStatus.OK, expectedPayload);

      const actualPayload = await sut.putAsync('~/resources/1', expectedPayload);

      actualPayload.should.eql(expectedPayload);
    });

    it('with query string should replace an existing resource', async () => {
      const expectedHeaders = { Location: `${sut.apiUrl}/resources/1` };
      await server.put('/api/resources/1').thenJSON(HttpStatus.OK, undefined, expectedHeaders);

      const actualHeaders = { Location: null };
      await sut.putAsync('~/resources/1', undefined, actualHeaders);

      actualHeaders.should.eql(expectedHeaders);
    });

    it('with invalid payload should throw exception', async () => {
      const expectedPayload = { error: 1234 };
      await server.put('/api/resources/1').thenReply(HttpStatus.BadRequest, JSON.stringify(expectedPayload));

      const error = await sut.putAsync('~/resources/1').then(() => should.fail('No error thrown.'), error => error);

      error.message.should.equal('400 Bad Request');
      error.data.should.eql(expectedPayload);
    });

    it('not-existing resource should throw exception', async () => {
      await server.put('/api/resources/1').thenReply(HttpStatus.NotFound);

      const error = await sut.putAsync('~/resources/1').then(() => should.fail('No error thrown.'), error => error);

      error.message.should.equal('404 Not Found');
    });
  });

  describe('PATCH', () => {
    const server = mockServer();
    let sut = null;

    beforeEach(() => (sut = new WebApiClient(server.url)));

    it('should update an existing resource', async () => {
      const expectedPayload = { id: 1 };
      await server.patch('/api/resources/1').thenJSON(HttpStatus.OK, expectedPayload);

      const actualPayload = await sut.patchAsync('~/resources/1', expectedPayload);

      actualPayload.should.eql(expectedPayload);
    });

    it('with query string should update an existing resource', async () => {
      const expectedHeaders = { Location: `${sut.apiUrl}/resources/1` };
      await server.patch('/api/resources/1').thenJSON(HttpStatus.OK, undefined, expectedHeaders);

      const actualHeaders = { Location: null };
      await sut.patchAsync('~/resources/1', undefined, actualHeaders);

      actualHeaders.should.eql(expectedHeaders);
    });

    it('with invalid payload should throw exception', async () => {
      const expectedPayload = { error: 1234 };
      await server.patch('/api/resources/1').thenReply(HttpStatus.BadRequest, JSON.stringify(expectedPayload));

      const error = await sut.patchAsync('~/resources/1').then(() => should.fail('No error thrown.'), error => error);

      error.message.should.equal('400 Bad Request');
      error.data.should.eql(expectedPayload);
    });

    it('not-existing resource should throw exception', async () => {
      await server.patch('/api/resources/1').thenReply(HttpStatus.NotFound);

      const error = await sut.patchAsync('~/resources/1').then(() => should.fail('No error thrown.'), error => error);

      error.message.should.equal('404 Not Found');
    });
  });

  describe('DELETE', () => {
    const server = mockServer();
    let sut = null;

    beforeEach(() => (sut = new WebApiClient(server.url)));

    it('should delete an existing resource', async () => {
      await server.delete('/api/resources/1').thenJSON(HttpStatus.NoContent);

      await sut.deleteAsync('~/resources/1');
    });

    it('not-existing resource should throw exception', async () => {
      await server.delete('/api/resources/1').thenReply(404);

      const error = await sut.deleteAsync('~/resources/1').then(() => should.fail('No error thrown.'), error => error);

      error.message.should.equal('404 Not Found');
    });
  });
});
