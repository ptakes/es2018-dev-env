import { BUILD_DIR, PROJECT_DIR } from '../project.config';
import { HotModuleReplacementPlugin, WatchIgnorePlugin } from 'webpack';
import fs from 'fs';
import path from 'path';

export default ({ host = 'localhost', port = 3000 } = {}) => {
  const certFile = path.join(__dirname, `${host}.crt`);
  const keyFile = path.join(__dirname, `${host}.key`);
  const https =
    fs.existsSync(certFile) && fs.existsSync(keyFile)
      ? {
        cert: fs.readFileSync(certFile),
        key: fs.readFileSync(keyFile)
      }
      : undefined;

  return {
    devServer: {
      host,
      hot: true,
      https,
      open: true,
      overlay: true,
      port,
      stats: 'errors-only',
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    },
    plugins: [new WatchIgnorePlugin([BUILD_DIR, path.join(PROJECT_DIR, 'node_modules')]), new HotModuleReplacementPlugin()]
  };
};
