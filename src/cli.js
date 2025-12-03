/**
 * Main CLI orchestration
 * Coordinates the project creation workflow
 */

const inquirer = require('inquirer');
const logger = require('./utils/logger');
const { pathExists } = require('./utils/fileSystem');
const { getProjectType } = require('./config/projectTypes');
const {
  getProjectTypePrompt,
  getProjectNamePrompt,
  getDirectoryPrompt,
  getIDEPrompt,
  getOverwritePrompt
} = require('./prompts/questions');
const { 
  createProject, 
  displaySuccessMessage,
  validateProjectParams 
} = require('./handlers/projectCreator');
const { openInIDE } = require('./handlers/ideOpener');

/**
 * Main CLI function
 * Orchestrates the entire project creation flow
 */
async function run() {
  try {
    // Display welcome banner
    displayBanner();

    // Get user inputs through prompts
    const answers = await getUserInputs();

    // Validate inputs
    const validation = validateProjectParams(answers);
    if (!validation.valid) {
      logger.error(validation.error);
      process.exit(1);
    }

    // Check if project exists and handle overwrite
    const shouldProceed = await handleExistingProject(answers);
    if (!shouldProceed) {
      logger.warning('Operation cancelled');
      process.exit(0);
    }

    // Create the project
    const projectPath = await createProject({
      projectType: answers.selectedType,
      projectName: answers.projectName,
      directory: answers.directory
    });

    // Display success message
    displaySuccessMessage(projectPath, answers.selectedType);

    // Open in IDE if selected
    if (answers.selectedIDE !== 'skip') {
      await openInIDE(projectPath, answers.selectedIDE);
    }

  } catch (error) {
    handleError(error);
  }
}

/**
 * Display welcome banner
 */
function displayBanner() {
  logger.newLine();
  logger.log('═══════════════════════════════════════════════════', 'bright');
  logger.log('   Devixo - Quick Project Setup', 'brightCyan');
  logger.log('═══════════════════════════════════════════════════', 'bright');
  logger.newLine();
}

/**
 * Get user inputs through interactive prompts
 * @returns {Promise<Object>} User answers
 */
async function getUserInputs() {
  const defaultDirectory = process.cwd();

  // Get project type
  const { selectedType } = await inquirer.prompt([getProjectTypePrompt()]);
  
  const config = getProjectType(selectedType);
  logger.success(`Selected: ${config.name}`);
  logger.newLine();

  // Get project name
  const { projectName } = await inquirer.prompt([getProjectNamePrompt()]);

  // Get directory
  const { directory } = await inquirer.prompt([getDirectoryPrompt(defaultDirectory)]);

  // Get IDE choice
  const { selectedIDE } = await inquirer.prompt([getIDEPrompt()]);

  return {
    selectedType,
    projectName,
    directory,
    selectedIDE
  };
}

/**
 * Handle existing project scenario
 * @param {Object} answers - User answers containing projectName and directory
 * @returns {Promise<boolean>} True if should proceed, false if cancelled
 */
async function handleExistingProject({ projectName, directory }) {
  const { expandHomePath, getProjectPath } = require('./utils/fileSystem');
  const expandedDir = expandHomePath(directory);
  const fullPath = getProjectPath(expandedDir, projectName);

  if (pathExists(fullPath)) {
    logger.warning(`Project "${projectName}" already exists at: ${fullPath}`);
    
    const { overwrite } = await inquirer.prompt([getOverwritePrompt(projectName)]);
    
    if (!overwrite) {
      return false;
    }
    
    logger.info('Proceeding with overwrite...');
  }

  return true;
}

/**
 * Handle errors gracefully
 * @param {Error} error - Error object
 */
function handleError(error) {
  logger.newLine();
  
  if (error.isTtyError) {
    logger.error('Prompt could not be rendered in this environment');
    logger.info('Please ensure you are running in an interactive terminal');
  } else if (error.message === 'PROJECT_EXISTS') {
    // This shouldn't happen as we handle it, but just in case
    logger.error('Project already exists');
  } else {
    logger.error(`An error occurred: ${error.message}`);
    
    // Show stack trace in debug mode
    if (process.env.DEBUG) {
      console.error(error);
    }
  }
  
  logger.newLine();
  process.exit(1);
}

/**
 * Handle graceful shutdown on SIGINT (Ctrl+C)
 */
process.on('SIGINT', () => {
  logger.newLine();
  logger.warning('Operation cancelled by user');
  logger.newLine();
  process.exit(0);
});

module.exports = { run };