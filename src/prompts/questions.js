/**
 * Inquirer prompt definitions
 * Centralizes all user prompts for consistency
 */

const { getProjectTypeChoices } = require('../config/projectTypes');
const { getIDEChoices } = require('../config/ides');
const { validateProjectName } = require('../utils/fileSystem');

/**
 * Get project type selection prompt
 * @returns {Object} Inquirer prompt configuration
 */
function getProjectTypePrompt() {
  return {
    type: 'list',
    name: 'selectedType',
    message: 'Select project type:',
    choices: getProjectTypeChoices(),
    pageSize: 10
  };
}

/**
 * Get project name input prompt
 * @returns {Object} Inquirer prompt configuration
 */
function getProjectNamePrompt() {
  return {
    type: 'input',
    name: 'projectName',
    message: 'Enter project name:',
    validate: (input) => {
      const result = validateProjectName(input);
      return result.valid ? true : result.error;
    },
    filter: (input) => input.trim() // Remove leading/trailing whitespace
  };
}

/**
 * Get directory path input prompt
 * @param {string} defaultPath - Default directory path
 * @returns {Object} Inquirer prompt configuration
 */
function getDirectoryPrompt(defaultPath) {
  return {
    type: 'input',
    name: 'directory',
    message: 'Enter directory path:',
    default: defaultPath,
    filter: (input) => input.trim()
  };
}

/**
 * Get IDE selection prompt
 * @returns {Object} Inquirer prompt configuration
 */
function getIDEPrompt() {
  return {
    type: 'list',
    name: 'selectedIDE',
    message: 'Select IDE to open:',
    choices: getIDEChoices(),
    pageSize: 10
  };
}

/**
 * Get overwrite confirmation prompt
 * @param {string} projectName - Name of the project that already exists
 * @returns {Object} Inquirer prompt configuration
 */
function getOverwritePrompt(projectName) {
  return {
    type: 'confirm',
    name: 'overwrite',
    message: `Project "${projectName}" already exists. Overwrite?`,
    default: false
  };
}

/**
 * Get all prompts for project creation flow
 * @param {string} defaultDirectory - Default directory path
 * @returns {Array<Object>} Array of prompt configurations
 */
function getProjectCreationPrompts(defaultDirectory) {
  return [
    getProjectTypePrompt(),
    getProjectNamePrompt(),
    getDirectoryPrompt(defaultDirectory),
    getIDEPrompt()
  ];
}

module.exports = {
  getProjectTypePrompt,
  getProjectNamePrompt,
  getDirectoryPrompt,
  getIDEPrompt,
  getOverwritePrompt,
  getProjectCreationPrompts
};