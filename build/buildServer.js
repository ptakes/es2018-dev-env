import { BUILD_DIR } from '../project.config';
import browserSync from 'browser-sync';
import fs from 'fs';
import path from 'path';

const host = 'localhost';
const port = 3000;

const certFile = path.join(__dirname, `${host}.crt`);
const keyFile = path.join(__dirname, `${host}.key`);
const https =
  fs.existsSync(certFile) && fs.existsSync(keyFile)
    ? {
      cert: certFile,
      key: keyFile
    }
    : undefined;

browserSync.init({
  cors: true,
  files: BUILD_DIR,
  host,
  https,
  port,
  server: BUILD_DIR
});
