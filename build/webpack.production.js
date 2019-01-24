import { clean, common, extractCss, loadJavaScript, optimize } from './webpack.parts';
import merge from 'webpack-merge';

export default merge([common({ mode: 'production' }), clean(), loadJavaScript(), extractCss(), optimize()]);
