import clean from './build/webpack.clean';
import common from './build/webpack.common';
import devServer from './build/webpack.devServer';
import extractCss from './build/webpack.extractCss';
import loadCss from './build/webpack.loadCss';
import loadJavaScript from './build/webpack.loadJavaScript';
import merge from 'webpack-merge';
import optimize from './build/webpack.optimize';

export default (process.env.NODE_ENV === 'production'
  ? merge([common(), clean(), loadJavaScript(), extractCss(), optimize()])
  : merge([common(), loadJavaScript(), loadCss(), devServer()]));
