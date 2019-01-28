import Enum from './enum';

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d+)?Z$/;

/**
 * Storage Types
 * @enum {number}
 * @type {'local'|'session'}
 */
export const StorageType = Enum(['local', 'session']);

/**
 * Class representing a Local or Session storage.
 */
export class Storage {
  /**
   * @constructor
   * @param {string} container Container name to be created in the Local or Session Storage.
   * @param {StorageType} [type=StorageType.local] Storage Type to be used, defaults to Local Storage.
   */
  constructor(container, type = StorageType.local) {
    this._container = container;
    this._containerRegex = new RegExp(`^@${this._container}/`);
    this._type = type !== undefined ? type : StorageType.local;
    this._initStorage(this._type);
  }

  /**
   * Gets the container name.
   */
  get container() {
    return this._container;
  }

  /**
   * Gets the number of items in the storage.
   *
   * @return {number} The number of items.
   */
  get count() {
    return this.keys().length;
  }

  /**
   * Clears the storage.
   */
  clear() {
    this.keys().forEach(key => this._storage.removeItem(this._scope(key)));
  }

  /**
   * Removes an item from the storage.
   *
   * @param {string} key  The key of the item.
   * @return {any} The deleted item.
   */
  delete(key) {
    let value = this.get(key);
    if (value !== undefined) {
      const scopedKey = this._scope(key);
      this._storage.removeItem(scopedKey);
      return value;
    }
  }

  /**
   * Gets an item from the storage.
   *
   * @param {string} key The key of the item.
   * @return {any} The item if found, otherwise null.
   */
  get(key) {
    const scopedKey = this._scope(key);
    const item = this._storage.getItem(scopedKey);
    try {
      return JSON.parse(item, this._reviver.bind(this));
    }
    catch (error) {
      return item;
    }
  }

  /**
   * Checks if the storage contains the given key.
   *
   * @param {string} key The key of the item.
   * @return {boolean} true if the key was found; otherwise false.
   */
  has(key) {
    return this.get(key) !== null;
  }

  /**
   * Gets all keys in the storage.
   *
   * @return {string[]} List of all keys.
   */
  keys() {
    return Object.keys(this._storage)
      .filter(key => this._containerRegex.test(key))
      .map(this._unscope.bind(this));
  }

  /**
   * Inserts an item into the storage. If an item already exists with the same key, it will be overridden by the new value.
   *
   * @param {string} key The key of the item.
   * @param {any} value The item to be added.
   * @return {any} The added item.
   */
  set(key, value) {
    const scopedKey = this._scope(key);
    const item = JSON.stringify(value);
    this._storage.setItem(scopedKey, item);
    return value;
  }

  /**
   * Gets all the values in the storage.
   *
   * @return {any[]} List of the values.
   */
  values() {
    return this.keys().map(key => this.get(key));
  }

  _initStorage(type) {
    switch (type) {
    case StorageType.local:
      this._storage = localStorage;
      break;

    case StorageType.session:
      this._storage = sessionStorage;
      break;
    }

    if (!this._storage.hasOwnProperty(this._container)) {
      this._storage[this._container] = null;
    }
  }

  _reviver(_key, value) {
    if (typeof value === 'string' && DATE_REGEX.test(value)) {
      return new Date(value);
    }
    return value;
  }

  _scope(key) {
    return `@${this._container}/${key}`;
  }

  _unscope(key) {
    return key.substr(`@${this._container}/`.length);
  }
}
