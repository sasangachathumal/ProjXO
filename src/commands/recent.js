/**
 * Recent command - Show recently accessed projects
 * Usage: pxo recent [limit]
 */

const inquirer = require('inquirer');
const { getRecentProjects, touchProject } = require('../storage/projects');
const { openInIDE } = require('../handlers/ideOpener');
const logger = require('../utils/logger');

/**
 * Format relative time (same as list.js)
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
 * Execute recent command
 * @param {number} limit - Number of recent projects to show
 */
async function recentCommand(limit = 10) {
  try {
    const projects = getRecentProjects(limit);
    
    if (projects.length === 0) {
      logger.info('No recent projects found');
      logger.log('\nCreate your first project with:', 'dim');
      logger.log('  pxo', 'cyan');
      return;
    }
    
    logger.newLine();
    logger.log(`🕐 Recent Projects (${projects.length})`, 'bright');
    logger.newLine();
    
    // Create choices for inquirer
    const choices = projects.map((project, index) => {
      const bookmark = project.bookmarked ? ' ⭐' : '';
      const typeDisplay = getTypeDisplay(project.type);
      const timeAgo = formatRelativeTime(project.lastAccessed);
      
      return {
        name: `${index + 1}. ${project.name}${bookmark}  │  ${typeDisplay}  │  ${timeAgo}`,
        value: project.id,
        short: project.name
      };
    });
    
    // Add separator and back option
    choices.push(
      new inquirer.Separator(),
      { name: '← Cancel', value: 'cancel' }
    );
    
    const { selectedId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedId',
        message: 'Select a project to open:',
        choices,
        pageSize: 15
      }
    ]);
    
    if (selectedId === 'cancel') {
      return;
    }
    
    // Open selected project
    await openSelectedProject(selectedId);
    
  } catch (error) {
    if (error.isTtyError) {
      logger.error('This command requires an interactive terminal');
    } else {
      logger.error(`Failed to show recent projects: ${error.message}`);
    }
  }
}

/**
 * Open selected project in IDE
 * @param {string} projectId - Project ID
 */
async function openSelectedProject(projectId) {
  const { getProjectById } = require('../storage/projects');
  const { getIDEChoices } = require('../config/ides');
  
  const project = getProjectById(projectId);
  
  if (!project) {
    logger.error('Project not found');
    return;
  }
  
  // Update last accessed time
  touchProject(project.id);
  
  // Use project's preferred IDE or prompt
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
  } else {
    logger.info(`Project path: ${project.path}`);
  }
}

module.exports = { recentCommand };