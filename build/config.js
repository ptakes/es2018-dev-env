import path from 'path';

export const appDir = path.join(__dirname, '../src');
export const appName = 'ECMAScript Dev Env';
export const buildDir = path.join(__dirname, '../dist');
export const debugMode = process.env.NODE_ENV !== 'production';
export const rootDir = path.join(__dirname, '..');
