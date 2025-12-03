/**
 * Project creator handler
 * Handles the project creation process
 */

const { runCommand } = require('../utils/command');
const { 
  expandHomePath, 
  ensureDirectory, 
  pathExists, 
  getProjectPath 
} = require('../utils/fileSystem');
const { getProjectType, getNextSteps } = require('../config/projectTypes');
const logger = require('../utils/logger');

/**
 * Create a new project
 * @param {Object} options - Project creation options
 * @param {string} options.projectType - Project type key
 * @param {string} options.projectName - Name of the project
 * @param {string} options.directory - Directory path where project will be created
 * @returns {Promise<string>} Full path to the created project
 * @throws {Error} If project creation fails
 */
async function createProject({ projectType, projectName, directory }) {
  // Get project type configuration
  const config = getProjectType(projectType);
  
  if (!config) {
    throw new Error(`Invalid project type: ${projectType}`);
  }

  // Expand home directory and ensure directory exists
  const expandedDir = expandHomePath(directory);
  ensureDirectory(expandedDir);

  // Get full project path
  const fullPath = getProjectPath(expandedDir, projectName);

  // Check if project already exists
  if (pathExists(fullPath)) {
    throw new Error('PROJECT_EXISTS');
  }

  // Display creation start message
  logger.section('Starting project creation...');

  try {
    // Execute project creation command in the target directory
    await runCommand(
      config.command,
      config.getArgs(projectName),
      expandedDir
    );

    // Run post-install if needed
    if (config.postInstall) {
      logger.info('Installing dependencies...');
      await runCommand('npm', ['install'], fullPath);
    }

    return fullPath;
    
  } catch (error) {
    // Provide helpful error message
    throw new Error(`Failed to create project: ${error.message}`);
  }
}

/**
 * Display project creation success message with next steps
 * @param {string} projectPath - Full path to the created project
 * @param {string} projectType - Project type key
 */
function displaySuccessMessage(projectPath, projectType) {
  logger.section('✓ Project created successfully!');

  logger.log('Project location:', 'bright');
  logger.log(`  ${projectPath}`, 'cyan');
  
  logger.newLine();
  logger.log('Next steps:', 'bright');
  
  const steps = getNextSteps(projectType, projectPath);
  steps.forEach(step => {
    logger.log(`  ${step}`, 'green');
  });
  
  logger.newLine();
}

/**
 * Validate project creation parameters
 * @param {Object} params - Parameters to validate
 * @param {string} params.projectType - Project type key
 * @param {string} params.projectName - Project name
 * @param {string} params.directory - Directory path
 * @returns {Object} { valid: boolean, error?: string }
 */
function validateProjectParams({ projectType, projectName, directory }) {
  // Validate project type
  const config = getProjectType(projectType);
  if (!config) {
    return {
      valid: false,
      error: `Invalid project type: ${projectType}`
    };
  }

  // Validate project name
  if (!projectName || projectName.trim() === '') {
    return {
      valid: false,
      error: 'Project name is required'
    };
  }

  // Validate directory
  if (!directory || directory.trim() === '') {
    return {
      valid: false,
      error: 'Directory is required'
    };
  }

  return { valid: true };
}

module.exports = {
  createProject,
  displaySuccessMessage,
  validateProjectParams
};