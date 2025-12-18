/**
 * Open command - Quick open project by name
 * Usage: pxo open <project-name>
 */

const inquirer = require('inquirer');
const { getProjectByName, touchProject, searchProjects } = require('../storage/projects');
const { openInIDE } = require('../handlers/ideOpener');
const { getIDEChoices } = require('../config/ides');
const logger = require('../utils/logger');

/**
 * Execute open command
 * @param {string} projectName - Project name to open
 */
async function openCommand(projectName) {
  try {
    if (!projectName) {
      logger.error('Please provide a project name');
      logger.log('\nUsage:', 'dim');
      logger.log('  pxo open <project-name>', 'cyan');
      return;
    }
    
    // Try to find project
    let project = getProjectByName(projectName);
    
    // If not found, try fuzzy search
    if (!project) {
      const matches = searchProjects(projectName);
      
      if (matches.length === 0) {
        logger.error(`Project "${projectName}" not found`);
        logger.log('\nList all projects with:', 'dim');
        logger.log('  pxo list', 'cyan');
        return;
      }
      
      if (matches.length === 1) {
        project = matches[0];
        logger.info(`Found similar project: ${project.name}`);
      } else {
        // Multiple matches, let user choose
        project = await selectFromMatches(matches);
        if (!project) return;
      }
    }
    
    // Update last accessed time
    touchProject(project.id);
    
    // Determine which IDE to use
    let ideKey = project.ide;
    
    if (!ideKey || ideKey === 'skip') {
      const { selectedIDE } = await inquirer.prompt([
        {
          type: 'list',
          name: 'selectedIDE',
          message: `Open "${project.name}" in:`,
          choices: getIDEChoices()
        }
      ]);
      ideKey = selectedIDE;
    }
    
    // Open in IDE
    if (ideKey !== 'skip') {
      const success = await openInIDE(project.path, ideKey);
      if (success) {
        logger.success(`Opened ${project.name}`);
      }
    } else {
      logger.info(`Project path: ${project.path}`);
    }
    
  } catch (error) {
    logger.error(`Failed to open project: ${error.message}`);
  }
}

/**
 * Let user select from multiple matches
 * @param {Array} matches - Array of matching projects
 * @returns {Promise<Object|null>} Selected project or null
 */
async function selectFromMatches(matches) {
  logger.info(`Found ${matches.length} matching projects:`);
  logger.newLine();
  
  const choices = matches.map(p => ({
    name: `${p.name} (${p.type})`,
    value: p.id,
    short: p.name
  }));
  
  choices.push(
    new inquirer.Separator(),
    { name: '← Cancel', value: 'cancel' }
  );
  
  const { selectedId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedId',
      message: 'Which project did you mean?',
      choices
    }
  ]);
  
  if (selectedId === 'cancel') {
    return null;
  }
  
  const { getProjectById } = require('../storage/projects');
  return getProjectById(selectedId);
}

module.exports = { openCommand };