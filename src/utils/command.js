/**
 * Command execution utility
 * Handles spawning child processes and command execution
 */

const { spawn } = require('child_process');
const logger = require('./logger');

/**
 * Execute a shell command
 * @param {string} command - Command to execute (e.g., 'npm', 'npx')
 * @param {string[]} args - Array of command arguments
 * @param {string} [cwd] - Working directory for command execution
 * @returns {Promise<void>} Resolves when command completes successfully
 * @throws {Error} If command exits with non-zero code
 */
function runCommand(command, args, cwd) {
  return new Promise((resolve, reject) => {
    // Log the command being executed for debugging
    logger.log(`\nExecuting: ${command} ${args.join(' ')}`, 'cyan');
    
    // Spawn the process
    const proc = spawn(command, args, {
      stdio: 'inherit', // Pipe stdin, stdout, stderr to parent process
      shell: true,      // Use shell for command execution
      cwd: cwd || process.cwd() // Use provided cwd or current directory
    });

    // Handle process completion
    proc.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Command failed with exit code ${code}`));
      } else {
        resolve();
      }
    });

    // Handle process errors (e.g., command not found)
    proc.on('error', (err) => {
      reject(new Error(`Failed to execute command: ${err.message}`));
    });
  });
}

/**
 * Check if a command exists in the system PATH
 * @param {string} command - Command to check
 * @returns {Promise<boolean>} True if command exists
 */
async function commandExists(command) {
  const checkCmd = process.platform === 'win32' ? 'where' : 'which';
  
  try {
    await runCommand(checkCmd, [command], process.cwd());
    return true;
  } catch {
    return false;
  }
}

module.exports = {
  runCommand,
  commandExists
};