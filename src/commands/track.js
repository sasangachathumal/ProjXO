/**
 * Track command - Add existing projects to tracking
 * Usage: pxo track [path] [options]
 */

const inquirer = require('inquirer');
const { detectProject, validateProjectPath } = require('../utils/projectDetector');
const { 
  getProjectByPath, 
  getProjectByName,
  addProject,
  updateProject 
} = require('../storage/projects');
const {
  getAutoDetectConfirmPrompt,
  getManualTrackingPrompts,
  getModeSelectionPrompt,
  getCustomTypePrompt,
  getOverwritePrompt,
  getRenamePrompt,
  getIDEPreferencePrompt
} = require('../prompts/trackQuestions');
const logger = require('../utils/logger');

/**
 * Execute track command
 * @param {string} projectPath - Path to project (default: current directory)
 * @param {Object} options - Command options
 */
async function trackCommand(projectPath = '.', options = {}) {
  try {
    logger.newLine();
    
    // Validate path
    const validation = validateProjectPath(projectPath);
    if (!validation.valid) {
      logger.error(validation.error);
      return;
    }
    
    // Show warning if no package.json
    if (validation.warning && !options.manual) {
      logger.warning(validation.warning);
    }
    
    // Check if already tracked
    const existingByPath = getProjectByPath(projectPath);
    if (existingByPath && !options.force) {
      logger.info(`Project already tracked: ${existingByPath.name}`);
      logger.log(`Path: ${existingByPath.path}`, 'dim');
      logger.log('\nUse --force to re-track', 'dim');
      return;
    }
    
    // Detect or manual mode
    if (options.manual) {
      await handleManualTracking(projectPath, options);
    } else {
      await handleAutoDetection(projectPath, options);
    }
    
  } catch (error) {
    logger.error(`Failed to track project: ${error.message}`);
    if (process.env.DEBUG) {
      console.error(error);
    }
  }
}

/**
 * Handle auto-detection flow
 * @param {string} projectPath - Path to project
 * @param {Object} options - Command options
 */
async function handleAutoDetection(projectPath, options) {
  logger.log('🔍 Detecting project...', 'blue');
  
  // Detect project
  const detection = await detectProject(projectPath);
  
  if (detection.error && !detection.detected) {
    logger.error(`Detection failed: ${detection.error}`);
    return;
  }
  
  // Check detection confidence
  if (!detection.detected || detection.confidence < 30) {
    // Low confidence or unknown - offer manual mode
    await handleLowConfidenceDetection(detection, options);
    return;
  }
  
  // Show detection results
  displayDetectionResults(detection);
  
  // Confirm with user (unless --yes flag)
  if (!options.yes) {
    const { confirm } = await inquirer.prompt([
      getAutoDetectConfirmPrompt(detection)
    ]);
    
    if (!confirm) {
      logger.info('Tracking cancelled');
      return;
    }
  }
  
  // Ask for IDE preference (unless --no-ide flag)
  let idePreference = options.ide || 'skip';
  if (!options.noIde && !options.ide) {
    const { ide } = await inquirer.prompt([getIDEPreferencePrompt()]);
    idePreference = ide;
  }
  
  // Check for naming conflicts
  const conflict = await handleNamingConflict(detection.name, detection.path);
  if (conflict.cancelled) {
    return;
  }
  
  const finalName = conflict.newName || detection.name;
  
  // Add to tracking
  try {
    const project = addProject({
      name: finalName,
      path: detection.path,
      type: detection.type,
      ide: idePreference === 'skip' ? null : idePreference
    });
    
    logger.newLine();
    logger.success(`Added ${finalName} to tracking`);
    logger.log(`\nQuick access:`, 'dim');
    logger.log(`  pxo open ${finalName}`, 'cyan');
    logger.log(`  pxo list`, 'dim');
    
  } catch (error) {
    logger.error(`Failed to add project: ${error.message}`);
  }
}

/**
 * Handle low confidence detection
 * @param {Object} detection - Detection result
 * @param {Object} options - Command options
 */
async function handleLowConfidenceDetection(detection, options) {
  logger.warning('Could not auto-detect project type');
  
  if (detection.metadata?.hasPackageJson) {
    logger.log('Found package.json but could not identify framework', 'dim');
  } else {
    logger.log('No package.json found', 'dim');
  }
  
  logger.newLine();
  
  // Ask user what to do
  const { mode } = await inquirer.prompt([getModeSelectionPrompt(detection)]);
  
  if (mode === 'skip') {
    logger.info('Tracking cancelled');
    return;
  }
  
  if (mode === 'manual') {
    await handleManualTracking(detection.path, options, detection);
  }
}

/**
 * Handle manual tracking flow
 * @param {string} projectPath - Path to project
 * @param {Object} options - Command options
 * @param {Object} detection - Optional detection result
 */
async function handleManualTracking(projectPath, options, detection = null) {
  logger.log('📝 Manual tracking mode', 'blue');
  logger.newLine();
  
  const suggestedName = detection?.name || require('path').basename(projectPath);
  
  // Get project details from user
  const answers = await inquirer.prompt(getManualTrackingPrompts(suggestedName));
  
  // Handle custom type
  let finalType = answers.type;
  if (answers.type === 'custom') {
    const { customType } = await inquirer.prompt([getCustomTypePrompt()]);
    finalType = customType;
  }
  
  // Check for naming conflicts
  const conflict = await handleNamingConflict(answers.name, projectPath);
  if (conflict.cancelled) {
    return;
  }
  
  const finalName = conflict.newName || answers.name;
  
  // Add to tracking
  try {
    const project = addProject({
      name: finalName,
      path: require('path').resolve(projectPath),
      type: finalType,
      ide: answers.ide === 'skip' ? null : answers.ide
    });
    
    logger.newLine();
    logger.success(`Added ${finalName} to tracking`);
    logger.log(`Type: ${finalType}`, 'dim');
    logger.log(`\nQuick access:`, 'dim');
    logger.log(`  pxo open ${finalName}`, 'cyan');
    logger.log(`  pxo list`, 'dim');
    
  } catch (error) {
    logger.error(`Failed to add project: ${error.message}`);
  }
}

/**
 * Display detection results
 * @param {Object} detection - Detection result
 */
function displayDetectionResults(detection) {
  logger.newLine();
  logger.log('✓ Project detected:', 'green');
  logger.newLine();
  
  logger.log(`  Name:        ${detection.name}`, 'cyan');
  logger.log(`  Type:        ${detection.type}`, 'cyan');
  logger.log(`  Language:    ${detection.language}`, 'cyan');
  logger.log(`  Path:        ${detection.path}`, 'dim');
  
  if (detection.packageManager !== 'npm') {
    logger.log(`  Pkg Manager: ${detection.packageManager}`, 'dim');
  }
  
  logger.log(`  Confidence:  ${detection.confidence}%`, 'dim');
  logger.newLine();
}

/**
 * Handle naming conflicts
 * @param {string} projectName - Proposed project name
 * @param {string} projectPath - Project path
 * @returns {Promise<Object>} Conflict resolution result
 */
async function handleNamingConflict(projectName, projectPath) {
  const existing = getProjectByName(projectName);
  
  // No conflict
  if (!existing) {
    return { cancelled: false };
  }
  
  // Same path - just update
  if (existing.path === require('path').resolve(projectPath)) {
    logger.info(`Updating existing project: ${projectName}`);
    return { cancelled: false };
  }
  
  // Different path - conflict!
  logger.newLine();
  logger.warning(`Project name conflict detected!`);
  logger.newLine();
  
  const { action } = await inquirer.prompt([
    getOverwritePrompt(projectName, existing.path, projectPath)
  ]);
  
  if (action === 'cancel') {
    logger.info('Tracking cancelled');
    return { cancelled: true };
  }
  
  if (action === 'replace') {
    // Delete existing and continue
    const { deleteProject } = require('../storage/projects');
    deleteProject(existing.id);
    logger.info(`Replaced existing project`);
    return { cancelled: false };
  }
  
  if (action === 'rename') {
    const { newName } = await inquirer.prompt([getRenamePrompt(projectName)]);
    
    // Check if new name also conflicts
    const newConflict = getProjectByName(newName);
    if (newConflict) {
      logger.error(`Name "${newName}" is also already in use`);
      logger.log('Please try again with a different name', 'dim');
      return { cancelled: true };
    }
    
    return { cancelled: false, newName };
  }
  
  return { cancelled: true };
}

module.exports = { trackCommand };