import { appName, debugMode } from '../build/config';
import $ from 'jquery';
import textPanel from './components/text-panel';

console.log(`debugMode: ${debugMode}`); // eslint-disable-line no-console
$('#main').append(textPanel(`Hello '${appName}'!`));
