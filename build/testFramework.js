import { JSDOM } from 'jsdom';
import Storage from 'dom-storage';
import chai from 'chai';
import chaiDateTime from 'chai-datetime';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

// Disable webpack loaders that Mocha doesn't understand...
// ... styles.
require.extensions['.css'] = () => {};
require.extensions['.scss'] = () => {};
// ... images.
require.extensions['.svg'] = () => {};
require.extensions['.gif'] = () => {};
require.extensions['.png'] = () => {};
require.extensions['.jpg'] = () => {};
require.extensions['.jpeg'] = () => {};
// ... data.
require.extensions['.csv'] = () => {};
require.extensions['.tsv'] = () => {};
require.extensions['.cson'] = () => {};
require.extensions['.json5'] = () => {};
require.extensions['.xml'] = () => {};
// ... fonts.
require.extensions['.ttf'] = () => {};
require.extensions['.eot'] = () => {};
require.extensions['.woff'] = () => {};
require.extensions['.woff2'] = () => {};

// Setup browser environment.
global.window = new JSDOM('<!doctype html><html><head></head><body></body></html>').window;
global.document = global.window.document;
global.localStorage = new Storage(null, { strict: true });
global.sessionStorage = new Storage(null, { strict: true });

// Setup mock server.
let httpServer = null;

// Setup Chai for BDD.
const should = chai.should();
chai.use(sinonChai);
chai.use(chaiDateTime);

// Setup Mocha root-level hooks.
const sandbox = sinon.createSandbox();
let mochaHooks = {};

before(() => {
  invokeHooks('before');
});

after(() => {
  invokeHooks('after');
  sandbox.restore();
  mochaHooks = {};
});

beforeEach(() => {
  invokeHooks('beforeEach');
});

afterEach(() => {
  invokeHooks('afterEach');
  sandbox.restore();
});

function invokeHooks(hookName) {
  for (const key of Object.keys(mochaHooks)) {
    const hook = mochaHooks[key][hookName];
    if (typeof hook === 'function') {
      hook();
    }
  }
}

// Mocks...

function mockBrowser(body = '<form id="main" class="container-fluid"></form>') {
  mochaHooks.mockBrowser = {
    beforeEach: () => {
      global.jQuery = require('jquery');
      global
        .jQuery('body')
        .empty()
        .append(body);
    }
  };
}

function mockConsole() {
  mochaHooks.mockConsole = {
    beforeEach: () => {
      sandbox.stub(console, 'debug');
      sandbox.stub(console, 'error');
      sandbox.stub(console, 'info');
      sandbox.stub(console, 'warn');
    }
  };
}

function mockStorage() {
  mochaHooks.mockStorage = {
    beforeEach: () => {
      global.localStorage.clear();
      global.sessionStorage.clear();
    }
  };
}

function mockServer(port) {
  httpServer = httpServer || require('mockttp').getLocal();
  mochaHooks.mockServer = {
    afterEach: () => httpServer.stop(),
    beforeEach: () => httpServer.start(port)
  };
  return httpServer;
}

export { mockBrowser, mockConsole, mockServer, mockStorage, should, sandbox as sinon };
