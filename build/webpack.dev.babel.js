import { common, devServer } from './webpack.parts';
import merge from 'webpack-merge';

export default merge([
  {
    devtool: 'inline-source-map',
    mode: 'development'
  },
  common(),
  devServer()
]);
