import { clean, common } from './webpack.parts';
import merge from 'webpack-merge';

export default merge([{ mode: 'production' }, common(), clean()]);
