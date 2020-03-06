import { APP_TITLE, BASE_TAG_URL, PROD_BUILD, SRC_DIR } from './buildConfig';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack'; // eslint-disable-line no-unused-vars

/**
 * @return {webpack.Configuration}
 */
export default () => ({
  module: {
    // eslint-disable-next-line sort-keys
    rules: [{ test: /\.html$/i, loader: 'html-loader' }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: path.join(SRC_DIR, 'favicon.ico'),
      inject: true,
      metadata: {
        // available in index.ejs
        baseUrl: BASE_TAG_URL,
        title: APP_TITLE
      },
      minify: PROD_BUILD
        ? {
            collapseWhitespace: true,
            keepClosingSlash: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
          }
        : undefined,
      template: path.join(SRC_DIR, 'index.ejs')
    })
  ]
});
