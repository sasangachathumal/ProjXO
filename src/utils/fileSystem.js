/**
 * File system utility functions
 * Handles all file and directory operations
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const logger = require('./logger');

/**
 * Expand tilde (~) in path to home directory
 * @param {string} filePath - Path that may contain ~
 * @returns {string} Expanded absolute path
 * @example
 * expandHomePath('~/Documents') // -> '/Users/username/Documents'
 */
function expandHomePath(filePath) {
  if (filePath.startsWith('~')) {
    return filePath.replace('~', os.homedir());
  }
  return filePath;
}

/**
 * Ensure a directory exists, create if it doesn't
 * @param {string} dirPath - Directory path to ensure
 * @returns {boolean} True if directory was created, false if already existed
 */
function ensureDirectory(dirPath) {
  const expandedPath = expandHomePath(dirPath);
  
  if (!fs.existsSync(expandedPath)) {
    fs.mkdirSync(expandedPath, { recursive: true });
    logger.success(`Created directory: ${expandedPath}`);
    return true;
  }
  
  return false;
}

/**
 * Check if a path exists
 * @param {string} filePath - Path to check
 * @returns {boolean} True if path exists
 */
function pathExists(filePath) {
  return fs.existsSync(expandHomePath(filePath));
}

/**
 * Check if a path is a directory
 * @param {string} dirPath - Path to check
 * @returns {boolean} True if path exists and is a directory
 */
function isDirectory(dirPath) {
  try {
    const stats = fs.statSync(expandHomePath(dirPath));
    return stats.isDirectory();
  } catch {
    return false;
  }
}

/**
 * Get the full absolute path
 * @param {string} dirPath - Directory path
 * @param {string} projectName - Project name
 * @returns {string} Full project path
 */
function getProjectPath(dirPath, projectName) {
  const expandedDir = expandHomePath(dirPath);
  return path.join(expandedDir, projectName);
}

/**
 * Validate directory path
 * @param {string} dirPath - Directory path to validate
 * @returns {Object} { valid: boolean, error?: string }
 */
function validateDirectoryPath(dirPath) {
  const expandedPath = expandHomePath(dirPath);
  
  // Check if path contains invalid characters
  const invalidChars = /[<>:"|?*]/;
  if (invalidChars.test(expandedPath)) {
    return {
      valid: false,
      error: 'Path contains invalid characters'
    };
  }
  
  // Check if parent directory exists (if path doesn't exist)
  if (!pathExists(expandedPath)) {
    const parentDir = path.dirname(expandedPath);
    if (!pathExists(parentDir)) {
      return {
        valid: false,
        error: 'Parent directory does not exist'
      };
    }
  }
  
  return { valid: true };
}

/**
 * Validate project name
 * @param {string} projectName - Project name to validate
 * @returns {Object} { valid: boolean, error?: string }
 */
function validateProjectName(projectName) {
  if (!projectName || !projectName.trim()) {
    return {
      valid: false,
      error: 'Project name cannot be empty'
    };
  }
  
  // Allow letters, numbers, hyphens, underscores, dots
  if (!/^[a-zA-Z0-9-_.]+$/.test(projectName)) {
    return {
      valid: false,
      error: 'Project name can only contain letters, numbers, hyphens, underscores, and dots'
    };
  }
  
  // Don't allow names starting with dots or hyphens
  if (/^[.-]/.test(projectName)) {
    return {
      valid: false,
      error: 'Project name cannot start with a dot or hyphen'
    };
  }
  
  return { valid: true };
}

module.exports = {
  expandHomePath,
  ensureDirectory,
  pathExists,
  isDirectory,
  getProjectPath,
  validateDirectoryPath,
  validateProjectName
};