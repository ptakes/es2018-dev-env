import fs from 'fs';
import path from 'path';
import { sealedMerge } from 'app-settings-loader/sealedMerge';

// @ts-ignore
const loadSettingsFile = file => (fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : {});

export const BUILD_ENV = process.env.NODE_ENV || 'development';
export const PROD_BUILD = BUILD_ENV === 'production';
export const TEST_BUILD = BUILD_ENV === 'test';
export const PROJ_DIR = path.dirname(__dirname);

export const OUT_DIR = path.join(PROJ_DIR, 'dist');
export const SRC_DIR = path.join(PROJ_DIR, 'src');
export const TMP_DIR = path.join(PROJ_DIR, '.tmp');

const settings = sealedMerge(loadSettingsFile(path.join(PROJ_DIR, 'settings.json')), loadSettingsFile(path.join(PROJ_DIR, `settings.${BUILD_ENV}.json`)));
export const APP_TITLE = settings.appTitle;
export const BASE_URL = settings.baseUrl;
export const BASE_TAG_URL = settings.baseTagUrl;
export const DEBUG_MODE = settings.debugMode;
export const MAX_SIZE_DATA_URL = settings.maxSizeDataUrl;
export const SERVER_HOST = settings.serverHost;
export const SERVER_PORT = settings.serverPort;
export const TEST_MODE = settings.testMode;

export const { ACCOLADE_SERVER } = process.env;
export const { ACCOLADE_USERNAME } = process.env;
export const { ACCOLADE_PASSWORD } = process.env;
