import { common, devServer, loadCss, loadJavaScript } from './webpack.parts';
import merge from 'webpack-merge';

export default merge([common({ mode: 'development' }), loadJavaScript(), loadCss(), devServer()]);
