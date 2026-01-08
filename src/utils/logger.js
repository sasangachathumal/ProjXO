/**
 * Logger utility for colored terminal output
 * Provides consistent formatting across the application
 */

// ANSI color codes for terminal styling
const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  
  // Standard colors
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  
  // Bright colors
  brightRed: '\x1b[91m',
  brightGreen: '\x1b[92m',
  brightYellow: '\x1b[93m',
  brightBlue: '\x1b[94m',
  brightCyan: '\x1b[96m'
};

/**
 * Main logging function
 * @param {string} message - Message to log
 * @param {string} color - Color key from COLORS object
 */
const log = (message, color = 'reset') => {
  const colorCode = COLORS[color] || COLORS.reset;
  console.log(`${colorCode}${message}${COLORS.reset}`);
}

/**
 * Log success message with green checkmark
 * @param {string} message - Success message
 */
const success = (message) => {
  log(`✓ ${message}`, 'green');
}

/**
 * Log error message with red X
 * @param {string} message - Error message
 */
const error = (message) => {
  log(`✗ ${message}`, 'red');
}

/**
 * Log warning message with yellow exclamation
 * @param {string} message - Warning message
 */
const warning = (message) => {
  log(`⚠ ${message}`, 'yellow');
}

/**
 * Log info message with blue icon
 * @param {string} message - Info message
 */
const info = (message) => {
  log(`ℹ ${message}`, 'blue');
}

/**
 * Log a horizontal separator line
 * @param {number} length - Length of separator (default: 50)
 * @param {string} color - Color of separator
 */
const separator = (length = 50, color = 'bright') => {
  log('='.repeat(length), color);
}

/**
 * Log a section header with separators
 * @param {string} title - Section title
 */
const section = (title) => {
  console.log(); // Empty line
  separator();
  log(title, 'bright');
  separator();
  console.log(); // Empty line
}

/**
 * Log an empty line
 */
const newLine = () => {
  console.log();
}

module.exports = {
  log,
  success,
  error,
  warning,
  info,
  separator,
  section,
  newLine,
  COLORS
};