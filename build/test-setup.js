import { JSDOM } from 'jsdom';
import Storage from 'dom-storage';
import chai from 'chai';
import chaiDateTime from 'chai-datetime';
import chaiJQuery from 'chai-jquery';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

// Emulate browser.
global.localStorage = new Storage(null, { strict: true });
global.sessionStorage = new Storage(null, { strict: true });
global.window = new JSDOM('<!doctype html><html><body><form id="main" class="container-fluid"></form></body></html>').window;
global.document = global.window.document;
global.jQuery = require('jquery');

// Mock console.
const sandbox = sinon.createSandbox();
sandbox.stub(console, 'debug');
sandbox.stub(console, 'error');
sandbox.stub(console, 'info');
sandbox.stub(console, 'warn');

beforeEach(() => {
  global.localStorage.clear();
  global.sessionStorage.clear();
  sandbox.reset();
});

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

// Setup Chai for BDD.
const should = chai.should();
chai.use(sinonChai);
chai.use(chaiDateTime);
chai.use(chaiJQuery);

export { should, sandbox as sinon };
