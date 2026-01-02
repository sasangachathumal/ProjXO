/**
 * Recent command - Show recently accessed projects
 * Usage: pxo recent [limit]
 */

const inquirer = require('inquirer');
const { getRecentProjects, touchProject } = require('../storage/projects');
const { openInIDE } = require('../handlers/ideOpener');
const { formatRelativeTime, getTypeDisplay } = require('../utils/common');
const logger = require('../utils/logger');

/**
 * Execute recent command
 * @param {number} limit - Number of recent projects to show
 */
const recentCommand = async (limit = 10) => {
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
      const typeDisplay = getTypeDisplay(project.type).padEnd(16);
      const timeAgo = formatRelativeTime(project.lastAccessed).padEnd(15);
      const indexDisplay = `${index + 1}.`.padEnd(4);
      const nameDisplay = project.name.padEnd(30);

      return {
        name: `${indexDisplay}${nameDisplay} ${typeDisplay} ${timeAgo}`,
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
const openSelectedProject = async (projectId) => {
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