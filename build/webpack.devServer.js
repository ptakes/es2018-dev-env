import { OUT_DIR, PROD_BUILD, SERVER_HOST, SERVER_PORT, SRC_DIR } from './buildConfig';
import chokidar from 'chokidar';
import fs from 'fs';
import path from 'path';
import webpack from 'webpack'; // eslint-disable-line no-unused-vars

const certFile = path.join(__dirname, `${SERVER_HOST}.crt`);
const keyFile = path.join(__dirname, `${SERVER_HOST}.pem`);
const https =
  fs.existsSync(certFile) && fs.existsSync(keyFile)
    ? {
        cert: fs.readFileSync(certFile),
        key: fs.readFileSync(keyFile)
      }
    : undefined;

/**
 * @return {webpack.Configuration}
 */
export default () => ({
  // eslint-disable-next-line object-shorthand
  devServer: {
    before(app, server) {
      chokidar.watch([`${SRC_DIR}/**/*.html`, `${SRC_DIR}/**/*.ejs`]).on('all', () => {
        // @ts-ignore
        server.sockWrite(server.sockets, 'content-changed');
      });
    },
    contentBase: OUT_DIR,
    disableHostCheck: true,
    historyApiFallback: true, // Serve index.html for all 404 (required for push-state)
    hot: !PROD_BUILD,
    https,
    open: true,
    overlay: true,
    port: SERVER_PORT,
    stats: 'errors-only',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
});
