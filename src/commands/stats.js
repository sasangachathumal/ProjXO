/**
 * Stats command - Show project statistics
 * Usage: pxo stats
 */

const { getProjectStats } = require('../storage/projects');
const { formatDate } = require('../utils/common');
const logger = require('../utils/logger');

/**
 * Execute stats command
 */
const statsCommand = () => {
  try {
    const stats = getProjectStats();

    if (stats.total === 0) {
      logger.info('No projects found');
      logger.log('\nCreate your first project with:', 'dim');
      logger.log('  pxo', 'cyan');
      return;
    }

    logger.newLine();
    logger.log('📊 Project Statistics', 'bright');
    logger.log('═'.repeat(50), 'dim');
    logger.newLine();

    // Total projects
    logger.log(`Total Projects:     ${stats.total}`, 'cyan');
    logger.newLine();

    // By type
    logger.log('Projects by Type:', 'bright');
    Object.entries(stats.byType).forEach(([type, count]) => {
      const percentage = ((count / stats.total) * 100).toFixed(0);
      const bar = '█'.repeat(Math.floor(percentage / 5));
      logger.log(`  ${type.padEnd(20)} ${count} (${percentage}%)  ${bar}`, 'dim');
    });
    logger.newLine();

    // Most used IDE
    logger.log(`Most Used IDE:      ${stats.mostUsedIDE}`, 'blue');
    logger.newLine();

    // Newest and oldest
    if (stats.newest) {
      logger.log('Recent Activity:', 'bright');
      logger.log(`  Newest:  ${stats.newest.name} (${formatDate(stats.newest.createdAt)})`, 'green');
      if (stats.oldest && stats.oldest.id !== stats.newest.id) {
        logger.log(`  Oldest:  ${stats.oldest.name} (${formatDate(stats.oldest.createdAt)})`, 'dim');
      }
    }

    logger.newLine();
    logger.log('═'.repeat(50), 'dim');
    logger.newLine();

  } catch (error) {
    logger.error(`Failed to get statistics: ${error.message}`);
  }
}

module.exports = { statsCommand };