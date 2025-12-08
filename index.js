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
const { listCommand } = require('./src/commands/list');
const { recentCommand } = require('./src/commands/recent');
const { openCommand } = require('./src/commands/open');
const { bookmarkCommand } = require('./src/commands/bookmark');
const { statsCommand } = require('./src/commands/stats');
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

// Show recent projects
program
  .command('recent')
  .description('Show recently accessed projects')
  .argument('[limit]', 'number of projects to show', '10')
  .action((limit) => {
    recentCommand(parseInt(limit));
  });

// Open project
program
  .command('open <project-name>')
  .description('Open a project in IDE')
  .action((projectName) => {
    openCommand(projectName);
  });

// Bookmark commands
program
  .command('bookmark [action] [project-name]')
  .description('Manage bookmarked projects')
  .action((action, projectName) => {
    bookmarkCommand(action, projectName);
  });

// Show statistics
program
  .command('stats')
  .description('Show project statistics')
  .action(() => {
    statsCommand();
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