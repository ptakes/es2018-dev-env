import { PROD_BUILD } from './build/buildConfig';
import baseConfig from './build/webpack.base';
import devServer from './build/webpack.devServer';
import loadData from './build/webpack.data';
import loadFonts from './build/webpack.fonts';
import loadHtml from './build/webpack.html';
import loadImages from './build/webpack.images';
import loadJavaScript from './build/webpack.javascript';
import loadPackages from './build/webpack.packages';
import loadStyles from './build/webpack.styles';
import merge from 'webpack-merge';
import optimize from './build/webpack.optimize';

export default PROD_BUILD
  ? merge(baseConfig(), loadHtml(), loadJavaScript(), loadStyles(true), loadImages(), loadFonts(), loadData(), loadPackages(), optimize())
  : merge(baseConfig(), loadHtml(), loadJavaScript(), loadStyles(false), loadImages(), loadFonts(), loadData(), loadPackages(), devServer());
