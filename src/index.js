import { appName } from '../build/config';
import component from './component';

document.body.appendChild(component(`Hello '${appName}'!`));
