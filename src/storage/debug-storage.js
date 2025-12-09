#!/usr/bin/env node

/**
 * Debug script for ProjXO storage
 * Run this to test if storage is working correctly
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

console.log('🔍 ProjXO Storage Debug\n');

// Check storage directory
const STORAGE_DIR = path.join(os.homedir(), '.projxo');
console.log('1. Storage directory:', STORAGE_DIR);
console.log('   Exists?', fs.existsSync(STORAGE_DIR) ? '✓' : '✗');

if (fs.existsSync(STORAGE_DIR)) {
  // Check permissions
  try {
    fs.accessSync(STORAGE_DIR, fs.constants.R_OK | fs.constants.W_OK);
    console.log('   Writable? ✓');
  } catch (err) {
    console.log('   Writable? ✗ (Permission denied)');
    console.log('   Error:', err.message);
  }
  
  // List files
  const files = fs.readdirSync(STORAGE_DIR);
  console.log('   Files:', files.length > 0 ? files.join(', ') : '(empty)');
} else {
  console.log('   Creating directory...');
  try {
    fs.mkdirSync(STORAGE_DIR, { recursive: true });
    console.log('   ✓ Created successfully');
  } catch (err) {
    console.log('   ✗ Failed to create:', err.message);
    process.exit(1);
  }
}

console.log('\n2. Testing storage module...');

try {
  const { initializeStorage, readProjects, writeProjects } = require('./database');
  
  // Initialize
  console.log('   Initializing storage...');
  initializeStorage();
  console.log('   ✓ Initialized');
  
  // Check files again
  const PROJECTS_FILE = path.join(STORAGE_DIR, 'projects.json');
  const BOOKMARKS_FILE = path.join(STORAGE_DIR, 'bookmarks.json');
  const CONFIG_FILE = path.join(STORAGE_DIR, 'config.json');
  
  console.log('\n3. Checking files:');
  console.log('   projects.json:', fs.existsSync(PROJECTS_FILE) ? '✓' : '✗');
  console.log('   bookmarks.json:', fs.existsSync(BOOKMARKS_FILE) ? '✓' : '✗');
  console.log('   config.json:', fs.existsSync(CONFIG_FILE) ? '✓' : '✗');
  
  // Test read/write
  console.log('\n4. Testing read/write:');
  const data = readProjects();
  console.log('   Read projects:', data.projects ? `✓ (${data.projects.length} projects)` : '✗');
  
  // Test adding a project
  console.log('\n5. Testing addProject:');
  const { addProject } = require('./projects');
  
  const testProject = {
    name: 'test-project-' + Date.now(),
    path: '/tmp/test-project',
    type: 'react-vite',
    ide: null
  };
  
  const project = addProject(testProject);
  console.log('   ✓ Added test project:', project.name);
  
  // Read back
  const updatedData = readProjects();
  console.log('   ✓ Total projects now:', updatedData.projects.length);
  
  // Show the file contents
  console.log('\n6. projects.json contents:');
  const content = fs.readFileSync(PROJECTS_FILE, 'utf8');
  console.log(content);
  
  console.log('\n✅ All tests passed!');
  console.log('\nYou can now run: pxo list');
  
} catch (error) {
  console.log('   ✗ Error:', error.message);
  console.log('\nFull error:');
  console.error(error);
  process.exit(1);
}