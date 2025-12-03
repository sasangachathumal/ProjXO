/**
 * IDE opener handler
 * Handles opening projects in various IDEs
 */

const { runCommand } = require('../utils/command');
const { getIDE, getIDEInstallInstructions } = require('../config/ides');
const logger = require('../utils/logger');

/**
 * Open a project in the specified IDE
 * @param {string} projectPath - Full path to the project
 * @param {string} ideKey - IDE key (e.g., 'vscode', 'cursor')
 * @returns {Promise<boolean>} True if opened successfully, false otherwise
 */
async function openInIDE(projectPath, ideKey) {
  // Get IDE configuration
  const ide = getIDE(ideKey);
  
  // Skip if no IDE selected or invalid IDE
  if (!ide || !ide.command) {
    return false;
  }

  try {
    logger.info(`Opening project in ${ide.name}...`);
    
    // Execute IDE command with project path
    await runCommand(ide.command, [projectPath]);
    
    logger.success(`Project opened in ${ide.name}`);
    return true;
    
  } catch (error) {
    // Handle IDE command failure
    logger.error(`Could not open ${ide.name}`);
    logger.warning(`Please ensure ${ide.name} is installed and command-line tools are enabled`);
    
    // Provide installation instructions
    const instructions = getIDEInstallInstructions(ideKey);
    logger.log(`\n  Setup: ${instructions}`, 'dim');
    
    // Provide fallback option
    logger.log(`  Or manually open: ${projectPath}`, 'yellow');
    
    return false;
  }
}

/**
 * Validate if IDE command is available
 * @param {string} ideKey - IDE key to validate
 * @returns {Promise<boolean>} True if command is available
 */
async function validateIDECommand(ideKey) {
  const ide = getIDE(ideKey);
  
  if (!ide || !ide.command) {
    return true; // Skip validation for 'skip' option
  }

  try {
    const { commandExists } = require('../utils/command');
    return await commandExists(ide.command);
  } catch {
    return false;
  }
}

module.exports = {
  openInIDE,
  validateIDECommand
};