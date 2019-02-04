/* eslint no-console:0 */
import { PROJECT_DIR } from '../project.config';
import chalk from 'chalk';
import childProcess from 'child_process';
import { copySync } from 'fs-extra';
import fs from 'fs';
import os from 'os';
import path from 'path';

const exclude = ['.git', '.nyc_output', 'coverage', 'dist', 'node_modules', 'package-lock.json'];

// Check arguments.
if (process.argv.length < 3) {
  console.error(`${chalk.red('Error')}: Missing project name.`);
  console.info(`${chalk.magenta('Usage')}: npm run clone ${chalk.cyan('<project name>')}`);
  process.exit(1);
}

const projectName = process.argv[2].replace(' ', '-');
const projectDescription = '';
const projectVersion = '1.0.0';
const projectAuthor = os.userInfo().username;

// Check if directory doesn't exist.
const cloneDir = path.join(path.dirname(PROJECT_DIR), projectName);
if (fs.existsSync(cloneDir)) {
  console.error(`${chalk.red('Error')}: Directory ${chalk.cyan(cloneDir)} already exists.`);
  process.exit(1);
}

// Create directory.
try {
  console.info(`${chalk.green('Info')}: Creating directory ${chalk.cyan(cloneDir)}...`);
  fs.mkdirSync(cloneDir);
}
catch (error) {
  console.error(`${chalk.red('Error')}: Failed to create directory ${chalk.cyan(cloneDir)}.`);
  process.exit(1);
}

// Copy project.
console.info(`${chalk.green('Info')}: Copying project to ${chalk.cyan(cloneDir)}...`);
const items = fs.readdirSync(PROJECT_DIR);
for (const item of items) {
  if (exclude.findIndex(x => x === item.toLowerCase()) === -1) {
    copySync(path.join(PROJECT_DIR, item), path.join(cloneDir, item), { errorOnExist: true, overwrite: false });
  }
}

// Update package.json file.
const projectFile = path.join(cloneDir, 'package.json');
console.info(`${chalk.green('Info')}: Updating ${chalk.cyan(projectFile)}...`);
const project = JSON.parse(fs.readFileSync(projectFile));
project.name = projectName;
project.description = projectDescription;
project.version = projectVersion;
project.author = projectAuthor;
fs.writeFileSync(projectFile, JSON.stringify(project, null, '  '), {});

// Initialize Git.
console.info(`${chalk.green('Info')}: Creating Git repository...`);
childProcess.execSync('git init', { cwd: cloneDir, stdio: 'inherit' });
childProcess.execSync('git add -A', { cwd: cloneDir, stdio: 'inherit' });
childProcess.execSync('git commit -m "Initial version"', { cwd: cloneDir, stdio: 'inherit' });

// Install NPM packages.
console.info(`${chalk.green('Info')}: Installing NPM packages...`);
childProcess.execSync('npm install -s', { cwd: cloneDir, stdio: 'inherit' });

process.exit(0);
