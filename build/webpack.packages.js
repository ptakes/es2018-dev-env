import { ProvidePlugin } from 'webpack';
import webpack from 'webpack'; // eslint-disable-line no-unused-vars, no-duplicate-imports

/**
 * @return {webpack.Configuration}
 */
export default () => ({
  module: {
    rules: [
      {
        test: require.resolve('jquery'),
        use: [
          {
            loader: 'expose-loader',
            options: 'jQuery'
          },
          {
            loader: 'expose-loader',
            options: '$'
          }
        ]
      }
    ]
  },
  plugins: [
    new ProvidePlugin({
      $: 'jquery',
      Popper: ['popper.js', 'default'],
      Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
      fetch: 'imports?this=>global!exports?global.fetch!isomorphic-fetch',
      jQuery: 'jquery',
      regeneratorRuntime: 'regenerator-runtime',
      'window.$': 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
});
