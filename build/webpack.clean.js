import { BUILD_DIR, PROJECT_DIR } from '../project.config';
import CleanWebpackPlugin from 'clean-webpack-plugin';

export default () => ({
  plugins: [
    new CleanWebpackPlugin([BUILD_DIR], {
      root: PROJECT_DIR,
      verbose: false
    })
  ]
});
