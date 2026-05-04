/**
 * Track command prompts
 * Questions for manual project tracking
 */

const { getProjectTypeChoices } = require('../config/projectTypes');
const { getIDEChoices } = require('../config/ides');

/**
 * Get confirmation prompt for auto-detected project
 * @param {Object} detection - Detection result
 * @returns {Object} Inquirer prompt
 */
function getAutoDetectConfirmPrompt(detection) {
  return {
    type: 'confirm',
    name: 'confirm',
    message: `Add "${detection.name}" (${detection.type}) to tracking?`,
    default: true
  };
}

/**
 * Get project name prompt for manual mode
 * @param {string} suggestedName - Suggested project name
 * @returns {Object} Inquirer prompt
 */
function getManualNamePrompt(suggestedName) {
  return {
    type: 'input',
    name: 'name',
    message: 'Enter project name:',
    default: suggestedName,
    validate: (input) => {
      if (!input || !input.trim()) {
        return 'Project name cannot be empty';
      }
      if (!/^[a-zA-Z0-9-_.]+$/.test(input)) {
        return 'Project name can only contain letters, numbers, hyphens, underscores, and dots';
      }
      return true;
    },
    filter: (input) => input.trim()
  };
}

/**
 * Get project type prompt for manual mode
 * @returns {Object} Inquirer prompt
 */
function getManualTypePrompt() {
  const choices = getProjectTypeChoices();
  
  // Add "Custom/Other" option
  choices.push({
    name: 'Custom/Other',
    value: 'custom',
    short: 'Custom'
  });
  
  return {
    type: 'list',
    name: 'type',
    message: 'Select project type:',
    choices,
    pageSize: 12
  };
}

/**
 * Get custom type name prompt
 * @returns {Object} Inquirer prompt
 */
function getCustomTypePrompt() {
  return {
    type: 'input',
    name: 'customType',
    message: 'Enter custom project type:',
    validate: (input) => {
      if (!input || !input.trim()) {
        return 'Custom type cannot be empty';
      }
      return true;
    },
    filter: (input) => input.trim()
  };
}

/**
 * Get language prompt for manual mode
 * @returns {Object} Inquirer prompt
 */
function getManualLanguagePrompt() {
  return {
    type: 'list',
    name: 'language',
    message: 'Select primary language:',
    choices: [
      { name: 'TypeScript', value: 'TypeScript' },
      { name: 'JavaScript', value: 'JavaScript' },
      { name: 'Other', value: 'Other' }
    ]
  };
}

/**
 * Get IDE preference prompt
 * @returns {Object} Inquirer prompt
 */
function getIDEPreferencePrompt() {
  return {
    type: 'list',
    name: 'ide',
    message: 'Default IDE for this project:',
    choices: getIDEChoices(),
    pageSize: 10
  };
}

/**
 * Get mode selection prompt (auto vs manual)
 * @param {Object} detection - Detection result
 * @returns {Object} Inquirer prompt
 */
function getModeSelectionPrompt(detection) {
  return {
    type: 'list',
    name: 'mode',
    message: `Could not auto-detect project type. How would you like to proceed?`,
    choices: [
      {
        name: 'Enter details manually',
        value: 'manual',
        short: 'Manual'
      },
      {
        name: 'Skip tracking this project',
        value: 'skip',
        short: 'Skip'
      }
    ]
  };
}

/**
 * Get all manual tracking prompts
 * @param {string} suggestedName - Suggested project name
 * @param {boolean} includeLanguage - Whether to ask about language
 * @returns {Array<Object>} Array of prompts
 */
function getManualTrackingPrompts(suggestedName, includeLanguage = true) {
  const prompts = [
    getManualNamePrompt(suggestedName),
    getManualTypePrompt()
  ];
  
  if (includeLanguage) {
    prompts.push(getManualLanguagePrompt());
  }
  
  prompts.push(getIDEPreferencePrompt());
  
  return prompts;
}

/**
 * Get overwrite confirmation prompt
 * @param {string} projectName - Existing project name
 * @param {string} existingPath - Existing project path
 * @param {string} newPath - New project path
 * @returns {Object} Inquirer prompt
 */
function getOverwritePrompt(projectName, existingPath, newPath) {
  return {
    type: 'list',
    name: 'action',
    message: `A project named "${projectName}" already exists.\n  Existing: ${existingPath}\n  New:      ${newPath}\n  What would you like to do?`,
    choices: [
      {
        name: 'Keep both (rename new project)',
        value: 'rename',
        short: 'Rename'
      },
      {
        name: 'Replace existing with new',
        value: 'replace',
        short: 'Replace'
      },
      {
        name: 'Cancel',
        value: 'cancel',
        short: 'Cancel'
      }
    ]
  };
}

/**
 * Get rename prompt
 * @param {string} originalName - Original project name
 * @returns {Object} Inquirer prompt
 */
function getRenamePrompt(originalName) {
  return {
    type: 'input',
    name: 'newName',
    message: 'Enter new project name:',
    default: `${originalName}-2`,
    validate: (input) => {
      if (!input || !input.trim()) {
        return 'Project name cannot be empty';
      }
      if (!/^[a-zA-Z0-9-_.]+$/.test(input)) {
        return 'Project name can only contain letters, numbers, hyphens, underscores, and dots';
      }
      return true;
    },
    filter: (input) => input.trim()
  };
}

module.exports = {
  getAutoDetectConfirmPrompt,
  getManualNamePrompt,
  getManualTypePrompt,
  getCustomTypePrompt,
  getManualLanguagePrompt,
  getIDEPreferencePrompt,
  getModeSelectionPrompt,
  getManualTrackingPrompts,
  getOverwritePrompt,
  getRenamePrompt
};