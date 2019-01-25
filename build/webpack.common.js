import { APP_DIR, APP_NAME, BUILD_DIR } from '../project.config';
import { EnvironmentPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

export default (mode = process.env.NODE_ENV, title = APP_NAME) => {
  const minify =
    mode === 'production'
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
      : undefined;

  return {
    devtool: mode === 'production' ? 'source-map' : 'inline-source-map',
    entry: {
      index: [path.join(APP_DIR, 'app'), path.join(APP_DIR, 'index')]
    },
    mode,
    output: {
      chunkFilename: '[name].[chunkhash].js',
      filename: '[name].[hash].js',
      path: mode === 'production' ? BUILD_DIR : APP_DIR,
      publicPath: '/'
    },
    plugins: [
      new EnvironmentPlugin(['NODE_ENV']),
      new HtmlWebpackPlugin({
        favicon: `${APP_DIR}/favicon.ico`,
        filename: 'index.html',
        inject: true,
        minify,
        template: `${APP_DIR}/index.html`,
        title
      })
    ],
    target: 'web'
  };
};
