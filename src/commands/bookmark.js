/**
 * Bookmark commands - Manage bookmarked projects
 * Usage: 
 *   pxo bookmark <project-name>     - Add bookmark
 *   pxo bookmark list               - List bookmarked
 *   pxo bookmark delete <name>      - Remove bookmark
 */

const inquirer = require('inquirer');
const { 
  getProjectByName, 
  setBookmark, 
  getAllProjects,
  touchProject 
} = require('../storage/projects');
const { openInIDE } = require('../handlers/ideOpener');
const logger = require('../utils/logger');

/**
 * Add bookmark to project
 * @param {string} projectName - Project name
 */
async function addBookmark(projectName) {
  try {
    const project = getProjectByName(projectName);
    
    if (!project) {
      logger.error(`Project "${projectName}" not found`);
      logger.log('\nList all projects with:', 'dim');
      logger.log('  pxo list', 'cyan');
      return;
    }
    
    if (project.bookmarked) {
      logger.info(`${project.name} is already bookmarked ⭐`);
      return;
    }
    
    setBookmark(project.id, true);
    logger.success(`Bookmarked ${project.name} ⭐`);
    
  } catch (error) {
    logger.error(`Failed to add bookmark: ${error.message}`);
  }
}

/**
 * List all bookmarked projects
 */
async function listBookmarks() {
  try {
    const projects = getAllProjects({ bookmarkedOnly: true });
    
    if (projects.length === 0) {
      logger.info('No bookmarked projects');
      logger.log('\nBookmark a project with:', 'dim');
      logger.log('  pxo bookmark <project-name>', 'cyan');
      return;
    }
    
    logger.newLine();
    logger.log(`⭐ Bookmarked Projects (${projects.length})`, 'bright');
    logger.newLine();
    
    // Create choices for inquirer
    const choices = projects.map(project => ({
      name: `${project.name}  │  ${project.type}`,
      value: project.id,
      short: project.name
    }));
    
    choices.push(
      new inquirer.Separator(),
      { name: '← Cancel', value: 'cancel' }
    );
    
    const { selectedId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedId',
        message: 'Select a project to open:',
        choices
      }
    ]);
    
    if (selectedId === 'cancel') {
      return;
    }
    
    // Open selected project
    await openBookmarkedProject(selectedId);
    
  } catch (error) {
    logger.error(`Failed to list bookmarks: ${error.message}`);
  }
}

/**
 * Remove bookmark from project
 * @param {string} projectName - Project name
 */
async function deleteBookmark(projectName) {
  try {
    const project = getProjectByName(projectName);
    
    if (!project) {
      logger.error(`Project "${projectName}" not found`);
      return;
    }
    
    if (!project.bookmarked) {
      logger.info(`${project.name} is not bookmarked`);
      return;
    }
    
    setBookmark(project.id, false);
    logger.success(`Removed bookmark from ${project.name}`);
    
  } catch (error) {
    logger.error(`Failed to remove bookmark: ${error.message}`);
  }
}

/**
 * Open bookmarked project
 * @param {string} projectId - Project ID
 */
async function openBookmarkedProject(projectId) {
  const { getProjectById } = require('../storage/projects');
  const { getIDEChoices } = require('../config/ides');
  
  const project = getProjectById(projectId);
  
  if (!project) {
    logger.error('Project not found');
    return;
  }
  
  touchProject(project.id);
  
  let ideKey = project.ide;
  
  if (!ideKey || ideKey === 'skip') {
    const { selectedIDE } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedIDE',
        message: 'Select IDE:',
        choices: getIDEChoices()
      }
    ]);
    ideKey = selectedIDE;
  }
  
  if (ideKey !== 'skip') {
    const success = await openInIDE(project.path, ideKey);
    if (success) {
      logger.success(`Opened ${project.name}`);
    }
  }
}

/**
 * Main bookmark command handler
 * @param {string} action - Subcommand (list, delete, or project name)
 * @param {string} projectName - Project name (for delete action)
 */
async function bookmarkCommand(action, projectName) {
  if (!action) {
    // Show help
    logger.log('\nBookmark Commands:', 'bright');
    logger.log('  pxo bookmark <project-name>     Add bookmark', 'dim');
    logger.log('  pxo bookmark list               List bookmarked projects', 'dim');
    logger.log('  pxo bookmark delete <name>      Remove bookmark', 'dim');
    return;
  }
  
  switch (action) {
    case 'list':
      await listBookmarks();
      break;
      
    case 'delete':
    case 'remove':
      if (!projectName) {
        logger.error('Please provide a project name');
        logger.log('  pxo bookmark delete <project-name>', 'cyan');
        return;
      }
      await deleteBookmark(projectName);
      break;
      
    default:
      // Treat as project name to bookmark
      await addBookmark(action);
      break;
  }
}

module.exports = { 
  bookmarkCommand,
  addBookmark,
  listBookmarks,
  deleteBookmark
};