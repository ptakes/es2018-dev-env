/**
 * Creates an immutable enum.
 * @example
 * const values = Enum(['zero', 'one', 'two'];
 * value.two; // returns 2
 * @example
 * const values = Enum(['zero', 'one', 'two'];
 * values[value.two]; // returns 'two'
 * @example
 * const values = Enum({ four: 4 };
 * value.four; // returns 4
 * @param {array|object} values The enum values.
 * @returns {object}
 */
export default function Enum(values) {
  const result = {};

  if (Array.isArray(values)) {
    let lastValue = -1;
    for (const key of values) {
      lastValue++;
      result[(result[lastValue] = '' + key)] = lastValue;
    }
  } else if (typeof values === 'object' || typeof values === 'function') {
    let lastValue = -1;
    for (const key of Object.keys(values)) {
      const value = values[key];
      lastValue = Number.isInteger(value) ? value : lastValue + 1;
      result[(result[lastValue] = key)] = lastValue;
    }
  } else {
    result[(result['' + values] = 0)] = 0;
  }

  return Object.freeze(result);
}
