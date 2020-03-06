import { MAX_SIZE_DATA_URL, PROD_BUILD } from './buildConfig';
import ImageminPlugin from 'imagemin-webpack-plugin';
import webpack from 'webpack'; // eslint-disable-line no-unused-vars

/**
 * @return {webpack.Configuration}
 */
export default () => ({
  module: {
    rules: [
      {
        test: /\.(png|gif|jpg|cur)$/i,
        // eslint-disable-next-line sort-keys
        loader: 'url-loader',
        options: { limit: MAX_SIZE_DATA_URL }
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'svg-url-loader',
          options: {
            encoding: 'base64',
            iesafe: true,
            limit: MAX_SIZE_DATA_URL,
            stripdeclarations: true
          }
        }
      }
    ]
  },
  plugins: [
    new ImageminPlugin({
      disable: !PROD_BUILD,
      test: /\.(jpe?g|png|gif|svg)$/
    })
  ]
});
