import path from 'path';

export const APP_DIR = path.join(__dirname, '../src');
export const APP_NAME = 'ES2018 Dev Env';
export const BUILD_DIR = path.join(__dirname, '../dist');
export const DEBUG = process.env.NODE_ENV !== 'production';
export const PROJECT_DIR = path.join(__dirname, '..');
