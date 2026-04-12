#!/usr/bin/env node

/**
 * ProjXO - Quick Project Setup & Management CLI
 * 
 * Entry point for the CLI application
 * Handles command routing and argument parsing
 * 
 * @version 1.2.0
 */

const { program } = require('commander');
const { run: createProject } = require('./src/cli');
const { listCommand } = require('./src/commands/list');
const { recentCommand } = require('./src/commands/recent');
const { openCommand } = require('./src/commands/open');
const { statsCommand } = require('./src/commands/stats');
const { trackCommand } = require('./src/commands/track');
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
  .command('open [project-name]')
  .description('Open a project in IDE')
  .action((projectName) => {
    openCommand(projectName);
  });

// Show statistics
program
  .command('stats')
  .description('Show project statistics')
  .action(() => {
    statsCommand();
  });

// Track existing project
program
  .command('track [path]')
  .description('Add an existing project to tracking')
  .option('-m, --manual', 'Force manual tracking mode')
  .option('-y, --yes', 'Skip confirmation prompts')
  .option('--no-ide', 'Skip IDE preference question')
  .option('--ide <ide>', 'Set IDE preference directly')
  .option('-f, --force', 'Force re-tracking even if already tracked')
  .action((path, options) => {
    trackCommand(path, options);
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