/**
 * List command - Show all tracked projects
 * Usage: pxo list
 */

const inquirer = require('inquirer');
const path = require('path');
const { getAllProjects, touchProject, deleteProject } = require('../storage/projects');
const { openInIDE } = require('../handlers/ideOpener');
const { getIDE } = require('../config/ides');
const { formatRelativeTime, getTypeDisplay, formatPadEnd } = require('../utils/common');
const logger = require('../utils/logger');

/**
 * Execute list command
 */
const listCommand = async () => {
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
      const typeDisplay = getTypeDisplay(project.type).padEnd(16);
      const timeAgo = formatRelativeTime(project.lastAccessed).padEnd(15);
      const nameDisplay = project.name.padEnd(30);

      return {
        name: `${nameDisplay} ${typeDisplay} ${timeAgo}`,
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
const showProjectActions = async (projectId) => {
  const padEndWidth = 40;
  const { getProjectById } = require('../storage/projects');
  const project = getProjectById(projectId);

  if (!project) {
    logger.error('Project not found');
    return;
  }

  const message = formatPadEnd(`Actions for "${project.name}"`.slice(0, 40), padEndWidth);

  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      pageSize: 8,
      message,
      choices: [
        { name: formatPadEnd('Open in IDE', padEndWidth), value: 'open' },
        { name: formatPadEnd('Copy path', padEndWidth), value: 'copy' },
        { name: formatPadEnd('Remove from tracking', padEndWidth), value: 'delete' },
        { name: formatPadEnd('Show details', padEndWidth), value: 'details' },
        new inquirer.Separator('-'.repeat(padEndWidth)),
        { name: formatPadEnd('← Back to list', padEndWidth), value: 'back' }
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
const handleOpenProject = async (project) => {
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
const handleCopyPath = (project) => {
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
const handleDeleteProject = async (project) => {
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
const showProjectDetails = (project) => {
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