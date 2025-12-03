#!/usr/bin/env node

/**
 * ProjXO - Quick Project Setup CLI
 * 
 * Entry point for the CLI application
 * This file should remain minimal, with all logic in src/cli.js
 * 
 * @author Your Name
 * @version 1.0.0
 */

// Import the main CLI function
const { run } = require('./src/cli');

// Run the CLI
run().catch((error) => {
  console.error('Fatal error:', error.message);
  process.exit(1);
});