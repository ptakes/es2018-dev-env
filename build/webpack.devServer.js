import { BUILD_DIR, PROJECT_DIR } from './config';
import { WatchIgnorePlugin } from 'webpack';
import path from 'path';

export default ({ host = 'localhost', port = 3000 } = {}) => ({
  devServer: {
    host,
    open: true,
    overlay: true,
    port,
    stats: 'errors-only',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },
  plugins: [new WatchIgnorePlugin([BUILD_DIR, path.join(PROJECT_DIR, 'node_modules')])]
});
