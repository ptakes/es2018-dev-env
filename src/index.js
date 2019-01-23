import { appName, debugMode } from '../build/config';
import component from './component';

console.log(`debugMode: ${debugMode}`); // eslint-disable-line no-console
document.body.appendChild(component(`Hello '${appName}'!`));
