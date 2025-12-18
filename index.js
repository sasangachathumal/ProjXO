#!/usr/bin/env node

/**
 * ProjXO - Quick Project Setup & Management CLI
 * 
 * Entry point for the CLI application
 * Handles command routing and argument parsing
 * 
 * @version 2.0.0
 */

const { program } = require('commander');
const { run: createProject } = require('./src/cli');
const { openCommand } = require('./src/commands/open');
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

// Open project
program
  .command('open [project-name]')
  .description('Open a project in IDE')
  .action((projectName) => {
    openCommand(projectName);
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
    logger.error(`Error: ${error.message}`);
    process.exit(1);
  }
}