/**
 * Project type configurations
 * Defines all supported project types and their creation commands
 * 
 * To add a new project type:
 * 1. Add a new key to PROJECT_TYPES object
 * 2. Specify name, command, getArgs function, and postInstall flag
 * 3. Add corresponding help text to getNextSteps function
 */

/**
 * Project type configuration object
 * @typedef {Object} ProjectTypeConfig
 * @property {string} name - Display name for the project type
 * @property {string} command - Command to execute (npm, npx, etc.)
 * @property {Function} getArgs - Function that returns command arguments
 * @property {boolean} postInstall - Whether to run npm install after creation
 * @property {string} [description] - Optional description
 */

const PROJECT_TYPES = {
  'react-vite': {
    name: 'React + Vite',
    description: 'React with Vite bundler (JavaScript)',
    command: 'npm',
    getArgs: (name) => ['create', 'vite@latest', name, '--', '--template', 'react'],
    postInstall: true
  },
  
  'react-vite-ts': {
    name: 'React + Vite (TypeScript)',
    description: 'React with Vite bundler and TypeScript',
    command: 'npm',
    getArgs: (name) => ['create', 'vite@latest', name, '--', '--template', 'react-ts'],
    postInstall: true
  },
  
  'nextjs': {
    name: 'Next.js',
    description: 'React framework for production',
    command: 'npx',
    getArgs: (name) => ['create-next-app@latest', name],
    postInstall: false // create-next-app already installs dependencies
  },
  
  'angular': {
    name: 'Angular',
    description: 'Platform for building web applications',
    command: 'npx',
    getArgs: (name) => ['@angular/cli@latest', 'new', name],
    postInstall: false // Angular CLI already installs dependencies
  },
  
  'react-native': {
    name: 'React Native (Expo)',
    description: 'Build native mobile apps with React',
    command: 'npx',
    getArgs: (name) => ['create-expo-app', name],
    postInstall: false // Expo already installs dependencies
  }
};

/**
 * Get project type configuration
 * @param {string} typeKey - Project type key
 * @returns {ProjectTypeConfig|null} Configuration object or null if not found
 */
function getProjectType(typeKey) {
  return PROJECT_TYPES[typeKey] || null;
}

/**
 * Get all project types as an array
 * @returns {Array<{key: string, config: ProjectTypeConfig}>}
 */
function getAllProjectTypes() {
  return Object.entries(PROJECT_TYPES).map(([key, config]) => ({
    key,
    config
  }));
}

/**
 * Get formatted choices for inquirer prompts
 * @returns {Array<{name: string, value: string}>}
 */
function getProjectTypeChoices() {
  return Object.entries(PROJECT_TYPES).map(([key, config]) => ({
    name: `${config.name} (${key})`,
    value: key,
    short: config.name
  }));
}

/**
 * Get next steps instructions based on project type
 * @param {string} typeKey - Project type key
 * @param {string} projectPath - Full path to the project
 * @returns {string[]} Array of instruction strings
 */
function getNextSteps(typeKey, projectPath) {
  const steps = [`cd ${projectPath}`];
  
  switch (typeKey) {
    case 'react-vite':
    case 'react-vite-ts':
      steps.push('npm run dev');
      break;
      
    case 'nextjs':
      steps.push('npm run dev');
      break;
      
    case 'angular':
      steps.push('ng serve');
      break;
      
    case 'react-native':
      steps.push('npx expo start');
      break;
      
    default:
      steps.push('npm start');
  }
  
  return steps;
}

/**
 * Check if a project type exists
 * @param {string} typeKey - Project type key to check
 * @returns {boolean}
 */
function isValidProjectType(typeKey) {
  return typeKey in PROJECT_TYPES;
}

module.exports = {
  PROJECT_TYPES,
  getProjectType,
  getAllProjectTypes,
  getProjectTypeChoices,
  getNextSteps,
  isValidProjectType
};