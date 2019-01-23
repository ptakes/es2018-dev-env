import { clean, loadJavaScript } from './webpack.parts';
import merge from 'webpack-merge';

const config = {
  devtool: false,
  mode: 'production',
  target: 'node'
};

export default merge([config, clean(), loadJavaScript()]);
