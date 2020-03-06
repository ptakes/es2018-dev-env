import { MAX_SIZE_DATA_URL } from './buildConfig';
import webpack from 'webpack'; // eslint-disable-line no-unused-vars

/**
 * @return {webpack.Configuration}
 */
export default () => ({
  module: {
    rules: [
      {
        test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        // eslint-disable-next-line sort-keys
        loader: 'url-loader',
        options: { limit: MAX_SIZE_DATA_URL, mimetype: 'application/font-woff2' }
      },
      {
        test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        // eslint-disable-next-line sort-keys
        loader: 'url-loader',
        options: { limit: MAX_SIZE_DATA_URL, mimetype: 'application/font-woff' }
      },
      // Load these fonts normally, as files:
      {
        test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        // eslint-disable-next-line sort-keys
        loader: 'file-loader'
      }
    ]
  }
});
