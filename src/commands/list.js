/**
 * List command - Show all tracked projects
 * Usage: pxo list
 */

const inquirer = require('inquirer');
const path = require('path');
const { getAllProjects, touchProject, deleteProject } = require('../storage/projects');
const { openInIDE } = require('../handlers/ideOpener');
const { getIDE } = require('../config/ides');
const logger = require('../utils/logger');

/**
 * Format relative time
 * @param {string} isoDate - ISO date string
 * @returns {string} Human-readable relative time
 */
function formatRelativeTime(isoDate) {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
  return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
}

/**
 * Get project type display name
 * @param {string} type - Project type key
 * @returns {string} Formatted display name
 */
function getTypeDisplay(type) {
  const typeMap = {
    'react-vite': 'React+Vite',
    'react-vite-ts': 'React+Vite(TS)',
    'nextjs': 'Next.js',
    'angular': 'Angular',
    'react-native': 'React Native'
  };
  return typeMap[type] || type;
}

/**
 * Execute list command
 */
async function listCommand() {
  try {
    const projects = getAllProjects();
    
    if (projects.length === 0) {
      logger.info('No projects found');
      logger.log('\nCreate your first project with:', 'dim');
      logger.log('  pxo', 'cyan');
      return;
    }
    
    logger.newLine();
    logger.log(`📦 Your Projects (${projects.length})`, 'bright');
    logger.newLine();
    
    // Create choices for inquirer
    const choices = projects.map(project => {
      const typeDisplay = getTypeDisplay(project.type);
      const timeAgo = formatRelativeTime(project.lastAccessed);
      
      return {
        name: `${project.name}  │  ${typeDisplay}  │  ${timeAgo}`,
        value: project.id,
        short: project.name
      };
    });
    
    // Add separator and action options
    choices.push(
      new inquirer.Separator(),
      { name: '← Back', value: 'back' }
    );
    
    const { selectedId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedId',
        message: 'Select a project:',
        choices,
        pageSize: 15
      }
    ]);
    
    if (selectedId === 'back') {
      return;
    }
    
    // Show actions for selected project
    await showProjectActions(selectedId);
    
  } catch (error) {
    if (error.isTtyError) {
      logger.error('This command requires an interactive terminal');
    } else {
      logger.error(`Failed to list projects: ${error.message}`);
    }
  }
}

/**
 * Show actions for a selected project
 * @param {string} projectId - Project ID
 */
async function showProjectActions(projectId) {
  const { getProjectById } = require('../storage/projects');
  const project = getProjectById(projectId);
  
  if (!project) {
    logger.error('Project not found');
    return;
  }
  
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: `Actions for "${project.name}":`,
      choices: [
        { name: '📂 Open in IDE', value: 'open' },
        { name: '📋 Copy path', value: 'copy' },
        { name: '🗑️  Remove from tracking', value: 'delete' },
        { name: 'ℹ️  Show details', value: 'details' },
        new inquirer.Separator(),
        { name: '← Back to list', value: 'back' }
      ]
    }
  ]);
  
  switch (action) {
    case 'open':
      await handleOpenProject(project);
      break;
      
    case 'copy':
      handleCopyPath(project);
      break;
      
    case 'delete':
      await handleDeleteProject(project);
      await listCommand(); // Refresh list
      break;
      
    case 'details':
      showProjectDetails(project);
      await showProjectActions(projectId); // Show actions again
      break;
      
    case 'back':
      await listCommand(); // Go back to list
      break;
  }
}

/**
 * Handle opening project in IDE
 * @param {Object} project - Project object
 */
async function handleOpenProject(project) {
  // Update last accessed time
  touchProject(project.id);
  
  // Use project's preferred IDE or prompt
  let ideKey = project.ide;
  
  if (!ideKey || ideKey === 'skip') {
    const { getIDEChoices } = require('../config/ides');
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
 * Handle copying project path
 * @param {Object} project - Project object
 */
function handleCopyPath(project) {
  // For now, just display the path
  // In future, could use clipboard library
  logger.info('Project path:');
  logger.log(`  ${project.path}`, 'cyan');
  logger.log('\n(Copy from above)', 'dim');
}

/**
 * Handle deleting project from tracking
 * @param {Object} project - Project object
 */
async function handleDeleteProject(project) {
  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: `Remove "${project.name}" from tracking? (Files won't be deleted)`,
      default: false
    }
  ]);
  
  if (confirm) {
    deleteProject(project.id);
    logger.success(`Removed ${project.name} from tracking`);
  }
}

/**
 * Show detailed project information
 * @param {Object} project - Project object
 */
function showProjectDetails(project) {
  logger.newLine();
  logger.log('━'.repeat(50), 'dim');
  logger.log(`  ${project.name}`, 'bright');
  logger.log('━'.repeat(50), 'dim');
  logger.log(`  Type:         ${getTypeDisplay(project.type)}`, 'cyan');
  logger.log(`  Path:         ${project.path}`, 'dim');
  logger.log(`  Created:      ${new Date(project.createdAt).toLocaleString()}`, 'dim');
  logger.log(`  Last accessed: ${formatRelativeTime(project.lastAccessed)}`, 'dim');
  if (project.ide) {
    const ide = getIDE(project.ide);
    logger.log(`  Default IDE:  ${ide?.name || project.ide}`, 'dim');
  }
  logger.log('━'.repeat(50), 'dim');
  logger.newLine();
}

module.exports = { listCommand };