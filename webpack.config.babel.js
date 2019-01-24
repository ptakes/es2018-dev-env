import clean from './build/webpack.clean';
import common from './build/webpack.common';
import devServer from './build/webpack.devServer';
import extractCss from './build/webpack.extractCss';
import loadCss from './build/webpack.loadCss';
import loadImages from './build/webpack.loadImages';
import loadJavaScript from './build/webpack.loadJavaScript';
import merge from 'webpack-merge';
import optimize from './build/webpack.optimize';

export default (process.env.NODE_ENV === 'production'
  ? merge([common(), clean(), loadJavaScript(), extractCss(), loadImages(), optimize()])
  : merge([common(), loadJavaScript(), loadCss(), loadImages(), devServer()]));
