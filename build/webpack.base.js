import { BASE_URL, OUT_DIR, PROD_BUILD, SRC_DIR } from './buildConfig';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin';
import path from 'path';
import webpack from 'webpack'; // eslint-disable-line no-unused-vars

/**
 * @return {webpack.Configuration}
 */
export default () => ({
  devtool: PROD_BUILD ? 'nosources-source-map' : 'cheap-module-eval-source-map',
  entry: {
    index: [path.join(SRC_DIR, 'main')]
  },
  mode: PROD_BUILD ? 'production' : 'development',
  output: {
    path: OUT_DIR,
    publicPath: BASE_URL
  },
  performance: { hints: false },
  plugins: [new DuplicatePackageCheckerPlugin(), new CleanWebpackPlugin()],
  resolve: {
    extensions: ['.js'],
    modules: [SRC_DIR, 'node_modules']
  },
  stats: true
});
