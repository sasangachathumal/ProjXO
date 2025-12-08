#!/usr/bin/env node

/**
 * ProjXO - Quick Project Setup & Management CLI
 * 
 * Entry point for the CLI application
 * Handles command routing and argument parsing
 * 
 * @version 1.1.0
 */

const { program } = require('commander');
const { run: createProject } = require('./src/cli');
const { listCommand } = require('./src/commands/list');
const logger = require('./src/utils/logger');

// Package info
const packageJson = require('./package.json');

// Configure CLI
program
  .name('pxo')
  .description('Quick project setup and management for modern web frameworks')
  .version(packageJson.version);

// Default command (no arguments) - Create new project
program
  .action(() => {
    createProject();
  });

// List all projects
program
  .command('list')
  .alias('ls')
  .description('List all tracked projects')
  .action(() => {
    listCommand();
  });

// Handle errors
program.exitOverride();

try {
  program.parse(process.argv);
} catch (error) {
  if (error.code === 'commander.help') {
    // Help was displayed, exit normally
    process.exit(0);
  } else if (error.code === 'commander.version') {
    // Version was displayed, exit normally
    process.exit(0);
  } else {
    // logger.error(`Error: ${error.message}`);
    process.exit(1);
  }
}