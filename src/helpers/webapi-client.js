import 'isomorphic-fetch';
import { Base64 } from 'js-base64';
import Enum from './enum';
import { Logger } from './logger';

export const HttpMethod = Enum(['DELETE', 'GET', 'OPTIONS', 'PATCH', 'POST', 'PUT']);

export const HttpStatus = Enum({
  OK: 200,
  Created: 201, // eslint-disable-line sort-keys
  NoContent: 204,
  BadRequest: 400, // eslint-disable-line sort-keys
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405 // eslint-disable-line sort-keys
});

const defaultServerUrl = 'http://localhost';
const defaultOptions = {
  accessToken: '',
  accessTokenExpiresIn: 0,
  apiUrl: '/api',
  password: '',
  username: '',
  windowsAuth: false
};

const logger = new Logger('webapi');

/**
 * A Web API client.
 */
export class WebApiClient {
  /**
   * @constructor
   * @param {string|URL} [serverUrl] The server URL.
   * @param {object} [options={}]
   * @param {string} [options.accessToken=''] The access token for Bearer authentication.
   * @param {number} [options.accessTokenExpiresIn=0] The access token expiration in seconds.
   * @param {string} [options.username=''] The user name for Basic authentition.
   * @param {string} [options.password=''] The user's password.
   * @param {boolean} [options.windowsAuth=false] true to support Windows Integration authentication; otherwise, false.
   * @param {string} [options.apiUrl='/api'] The API URL.
   */
  constructor(serverUrl = defaultServerUrl, options = {}) {
    this._serverUrl = new URL(new URL(serverUrl || defaultServerUrl).origin);

    this._options = Object.assign({}, defaultOptions, options);
    this._options.accessTokenExpiresAt = timestamp(this._options.accessTokenExpiresIn);
    this._options.apiUrl = this._url(this._options.apiUrl);
  }

  /**
   * Gets the api URL.
   * @return {URL} The api URL.
   */
  get apiUrl() {
    return this._options.apiUrl;
  }

  /**
   * Gets the server URL.
   * @return {URL} The server URL.
   */
  get serverUrl() {
    return this._serverUrl;
  }

  /**
   * Deletes a resource.
   * @async
   * @param {string} url  The relative URL to the resource.
   * @param {object} [headers] The response headers to return.
   * @param {boolean} [anonymous=false] If true, makes an anonymous call.
   * @return {Promise}
   */
  deleteAsync(url, headers, anonymous) {
    return this._fetchAsync(HttpMethod.DELETE, url, undefined, headers, anonymous);
  }

  /**
   * Gets a resource.
   * @async
   * @param {string} url The relative URL to the resource.
   * @param {object} [headers] The response headers to return.
   * @param {boolean} [anonymous=false] If true, makes an anonymous call.
   * @return {Promise<any>} The resource.
   */
  getAsync(url, headers, anonymous) {
    return this._fetchAsync(HttpMethod.GET, url, undefined, headers, anonymous);
  }

  /**
   * Partial updates a resource.
   * @async
   * @param {string} url The relative URL to the resource.
   * @param {any} data The updates.
   * @param {object} [headers] The response headers to return.
   * @param {boolean} [anonymous=false] If true, makes an anonymous call.
   * @return {Promise<any>} The updated resource.
   */
  patchAsync(url, data, headers, anonymous) {
    return this._fetchAsync(HttpMethod.PATCH, url, data, headers, anonymous);
  }

  /**
   * Creates a new resource.
   * @async
   * @param {string} url  The relative URL to the resource collection.
   * @param {any} data  The resource.
   * @param {object} [headers] The response headers to return.
   * @param {boolean} [anonymous=false] If true, makes an anonymous call.
   * @return {Promise<any>} The created resource or the location of the resource.
   */
  postAsync(url, data, headers, anonymous) {
    return this._fetchAsync(HttpMethod.POST, url, data, headers, anonymous);
  }

  /**
   * Updates a resource.
   * @async
   * @param {string} url  The relative URL to the resource.
   * @param {any} data The updates.
   * @param {object} [headers] The response headers to return.
   * @param {boolean} [anonymous=false] If true, makes an anonymous call.
   * @return {Promise<any>} The updated resource.
   */
  putAsync(url, data, headers, anonymous) {
    return this._fetchAsync(HttpMethod.PUT, url, data, headers, anonymous);
  }

  _accessToken() {
    const now = timestamp();
    if (this._options.accessToken && this._options.accessTokenExpiresAt <= now) {
      logger.warn('Access token expired.');
      this._options.accessToken = '';
    }

    return this._options.accessToken;
  }

  _fetchAsync(method, url, data, responseHeaders, anonymous) {
    const hasBody = method === 'POST' || method === 'PUT' || method === 'PATCH';

    const headers = new Headers({ Accept: 'application/json' });
    if (hasBody) {
      headers.append('Content-Type', 'application/json');
    }

    const hasCredentials = anonymous || !this._setAuthorization(headers);

    const request = new Request(this._url(url).href, {
      body: hasBody ? JSON.stringify(data) : undefined,
      credentials: hasCredentials ? 'include' : 'omit',
      headers,
      method: HttpMethod[method],
      mode: 'cors'
    });
    logger.debug(`${request.method} ${request.url}`, request);

    return fetch(request)
      .then(checkStatusAsync)
      .then(response => parseResponseHeaders(response, responseHeaders))
      .then(parseJsonAsync);
  }

  _setAuthorization(headers) {
    if (this._options.username && this._options.password) {
      logger.debug(`Basic Authentication: ${this._options.username}`);
      headers.append('Authorization', `Basic ${Base64.encode(this._options.username + ':' + this._options.password)}`);
      return true;
    }

    const accessToken = this._accessToken();
    if (accessToken) {
      logger.debug(`Bearer Authentication: ${accessToken}`);
      headers.append('Authorization', `Bearer ${accessToken}`);
      return true;
    }

    logger.debug(`Windows Integrated Authentication: ${this._options.windowsAuth}`);
    return this._options.windowsAuth;
  }

  _url(url) {
    return new URL(('' + url).replace('~/', `${this._options.apiUrl.href}/`).replace(/\/*$/, ''), this._serverUrl);
  }
}

async function checkStatusAsync(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  else {
    const error = new Error(`${response.status} ${response.statusText}`);
    error.response = response;
    error.data = await parseJsonAsync(response);
    logger.error(error.message, error);
    throw error;
  }
}

function parseResponseHeaders(response, responseHeaders) {
  if (typeof responseHeaders == 'object' && responseHeaders !== null) {
    for (const name of Object.keys(responseHeaders)) {
      responseHeaders[name] = response.headers.get(name);
    }
  }
  return response;
}

async function parseJsonAsync(response) {
  try {
    return await response.json();
  }
  catch (error) {
    // Ignore.
    logger.debug('Failed to parse response payload.', response, error);
  }
}

function timestamp(seconds = 0) {
  const timestamp = new Date();
  timestamp.setSeconds(timestamp.getSeconds() + (seconds |= 0)); // eslint-disable-line no-bitwise
  return timestamp;
}
