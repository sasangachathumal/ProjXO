/**
 * Database utility for ProjXO
 * Handles low-level file operations for project tracking
 */

/**
 * Storage implementation using JSON files.
 * 
 * Future consideration: Migrate to SQLite for better performance
 * at scale (1000+ projects). Node.js includes sqlite module
 * since v22.5.0, making it dependency-free.
 * 
 * Reasons for current JSON approach:
 * - Human-readable and editable
 * - Zero dependencies
 * - Sufficient performance for typical use
 * - Easier debugging and backup
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

// Storage directory in user's home
const STORAGE_DIR = path.join(os.homedir(), '.projxo');
const PROJECTS_FILE = path.join(STORAGE_DIR, 'projects.json');
const BOOKMARKS_FILE = path.join(STORAGE_DIR, 'bookmarks.json');
const CONFIG_FILE = path.join(STORAGE_DIR, 'config.json');

/**
 * Initialize storage directory and files
 * Creates directory and empty files if they don't exist
 */
function initializeStorage() {
  // Create storage directory if it doesn't exist
  if (!fs.existsSync(STORAGE_DIR)) {
    fs.mkdirSync(STORAGE_DIR, { recursive: true });
  }

  // Create projects file if it doesn't exist
  if (!fs.existsSync(PROJECTS_FILE)) {
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify({ projects: [] }, null, 2), 'utf8');
  }

  // Create bookmarks file if it doesn't exist
  if (!fs.existsSync(BOOKMARKS_FILE)) {
    fs.writeFileSync(BOOKMARKS_FILE, JSON.stringify({ bookmarks: [] }, null, 2), 'utf8');
  }

  // Create config file if it doesn't exist
  if (!fs.existsSync(CONFIG_FILE)) {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify({ 
      version: '1.0.0',
      defaultIDE: null,
      lastSync: null
    }, null, 2), 'utf8');
  }
}

/**
 * Read projects database
 * @returns {Object} Projects data object
 */
function readProjects() {
  try {
    initializeStorage();
    const data = fs.readFileSync(PROJECTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file is corrupted, return empty structure
    console.warn('Failed to read projects database, initializing new one');
    return { projects: [] };
  }
}

/**
 * Write projects database
 * @param {Object} data - Projects data object
 */
function writeProjects(data) {
  try {
    initializeStorage();
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    throw new Error(`Failed to write projects database: ${error.message}`);
  }
}

/**
 * Read bookmarks database
 * @returns {Object} Bookmarks data object
 */
function readBookmarks() {
  try {
    initializeStorage();
    const data = fs.readFileSync(BOOKMARKS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.warn('Failed to read bookmarks database, initializing new one');
    return { bookmarks: [] };
  }
}

/**
 * Write bookmarks database
 * @param {Object} data - Bookmarks data object
 */
function writeBookmarks(data) {
  try {
    initializeStorage();
    fs.writeFileSync(BOOKMARKS_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    throw new Error(`Failed to write bookmarks database: ${error.message}`);
  }
}

/**
 * Read config
 * @returns {Object} Config data object
 */
function readConfig() {
  try {
    initializeStorage();
    const data = fs.readFileSync(CONFIG_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.warn('Failed to read config, initializing new one');
    return { version: '1.0.0', defaultIDE: null };
  }
}

/**
 * Write config
 * @param {Object} data - Config data object
 */
function writeConfig(data) {
  try {
    initializeStorage();
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    throw new Error(`Failed to write config: ${error.message}`);
  }
}

/**
 * Get storage directory path
 * @returns {string} Full path to storage directory
 */
function getStorageDir() {
  return STORAGE_DIR;
}

/**
 * Backup database files
 * Creates timestamped backups
 * @returns {string} Backup directory path
 */
function backupDatabase() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(STORAGE_DIR, 'backups', timestamp);
  
  fs.mkdirSync(backupDir, { recursive: true });
  
  if (fs.existsSync(PROJECTS_FILE)) {
    fs.copyFileSync(PROJECTS_FILE, path.join(backupDir, 'projects.json'));
  }
  
  if (fs.existsSync(BOOKMARKS_FILE)) {
    fs.copyFileSync(BOOKMARKS_FILE, path.join(backupDir, 'bookmarks.json'));
  }
  
  if (fs.existsSync(CONFIG_FILE)) {
    fs.copyFileSync(CONFIG_FILE, path.join(backupDir, 'config.json'));
  }
  
  return backupDir;
}

module.exports = {
  initializeStorage,
  readProjects,
  writeProjects,
  readBookmarks,
  writeBookmarks,
  readConfig,
  writeConfig,
  getStorageDir,
  backupDatabase
};