import { JSDOM } from 'jsdom';
import Storage from 'dom-storage';
import chai from 'chai';
import chaiDateTime from 'chai-datetime';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

// Setup Chai for BDD.
const should = chai.should();
chai.use(sinonChai);
chai.use(chaiDateTime);

// Emulate browser.
global.localStorage = new Storage(null, { strict: true });
global.sessionStorage = new Storage(null, { strict: true });
global.window = new JSDOM('<!doctype html><html><body></body></html>').window;
global.document = global.window.document;

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

export { should, sinon };
