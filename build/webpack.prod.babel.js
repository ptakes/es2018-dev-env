import { clean, common } from './webpack.parts';
import merge from 'webpack-merge';

const config = {
  devtool: 'source-map',
  mode: 'production'
};

export default merge([config, common(), clean()]);
