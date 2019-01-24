import { APP_DIR, APP_NAME, BUILD_DIR } from './config';
import { EnvironmentPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

export default (mode = process.env.NODE_ENV, title = APP_NAME) => ({
  devtool: mode === 'production' ? 'source-map' : 'inline-source-map',
  entry: {
    index: [path.join(APP_DIR, 'app'), path.join(APP_DIR, 'index')]
  },
  mode,
  output: {
    filename: '[name].js',
    path: mode === 'production' ? BUILD_DIR : APP_DIR,
    publicPath: '/'
  },
  plugins: [
    new EnvironmentPlugin(['NODE_ENV']),
    new HtmlWebpackPlugin({
      favicon: `${APP_DIR}/favicon.ico`,
      filename: 'index.html',
      inject: true,
      template: `${APP_DIR}/index.html`,
      title
    })
  ],
  target: 'web'
});
