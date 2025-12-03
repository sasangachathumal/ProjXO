/**
 * IDE/Editor configurations
 * Defines supported IDEs and their command-line commands
 * 
 * To add a new IDE:
 * 1. Add a new key to IDES object
 * 2. Specify name and command
 * 3. Optionally add installation instructions in getIDEInstallInstructions
 */

/**
 * IDE configuration object
 * @typedef {Object} IDEConfig
 * @property {string} name - Display name for the IDE
 * @property {string|null} command - Command-line command to open IDE (null for 'skip')
 * @property {string} [description] - Optional description
 */

const IDES = {
  'vscode': {
    name: 'VS Code',
    command: 'code',
    description: 'Visual Studio Code'
  },
  
  'cursor': {
    name: 'Cursor',
    command: 'cursor',
    description: 'Cursor AI Editor'
  },
  
  'webstorm': {
    name: 'WebStorm',
    command: 'webstorm',
    description: 'JetBrains WebStorm IDE'
  },
  
  'idea': {
    name: 'IntelliJ IDEA',
    command: 'idea',
    description: 'JetBrains IntelliJ IDEA'
  },
  
  'sublime': {
    name: 'Sublime Text',
    command: 'subl',
    description: 'Sublime Text Editor'
  },
  
  'atom': {
    name: 'Atom',
    command: 'atom',
    description: 'GitHub Atom Editor'
  },
  
  'skip': {
    name: 'Skip (open manually)',
    command: null,
    description: 'Do not open in any IDE'
  }
};

/**
 * Get IDE configuration
 * @param {string} ideKey - IDE key
 * @returns {IDEConfig|null} Configuration object or null if not found
 */
function getIDE(ideKey) {
  return IDES[ideKey] || null;
}

/**
 * Get all IDEs as an array
 * @returns {Array<{key: string, config: IDEConfig}>}
 */
function getAllIDEs() {
  return Object.entries(IDES).map(([key, config]) => ({
    key,
    config
  }));
}

/**
 * Get formatted choices for inquirer prompts
 * @returns {Array<{name: string, value: string}>}
 */
function getIDEChoices() {
  return Object.entries(IDES).map(([key, config]) => ({
    name: config.name,
    value: key,
    short: config.name
  }));
}

/**
 * Check if an IDE key is valid
 * @param {string} ideKey - IDE key to check
 * @returns {boolean}
 */
function isValidIDE(ideKey) {
  return ideKey in IDES;
}

/**
 * Get installation instructions for an IDE command
 * @param {string} ideKey - IDE key
 * @returns {string} Installation instructions
 */
function getIDEInstallInstructions(ideKey) {
  const instructions = {
    'vscode': 'Install "Shell Command: Install \'code\' command in PATH" from Command Palette (Cmd/Ctrl+Shift+P)',
    'cursor': 'Cursor command is usually available after installation',
    'webstorm': 'Enable in WebStorm: Tools → Create Command-line Launcher',
    'idea': 'Enable in IntelliJ IDEA: Tools → Create Command-line Launcher',
    'sublime': 'Create symlink: ln -s "/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl" /usr/local/bin/subl',
    'atom': 'Install shell commands from Atom: Atom → Install Shell Commands'
  };
  
  return instructions[ideKey] || 'Please refer to your IDE\'s documentation for command-line setup';
}

module.exports = {
  IDES,
  getIDE,
  getAllIDEs,
  getIDEChoices,
  isValidIDE,
  getIDEInstallInstructions
};