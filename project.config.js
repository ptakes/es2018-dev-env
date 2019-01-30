import { name } from './package.json';
import path from 'path';

export const APP_DIR = path.join(__dirname, 'src');
export const APP_NAME = name;
export const BUILD_DIR = path.join(__dirname, 'dist');
export const DEBUG_MODE = process.env.NODE_ENV !== 'production';
export const DATA_URL_LIMIT = 15000;
export const PROJECT_DIR = __dirname;
export const TEST_MODE = global && typeof global.it === 'function';
