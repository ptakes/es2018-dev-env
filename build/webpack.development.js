import { common, devServer } from './webpack.parts';
import merge from 'webpack-merge';

export default merge([common({ mode: 'development' }), devServer()]);
