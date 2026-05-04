/**
 * Project Detection Utility
 * Automatically detects project type, name, and metadata
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Framework detection signatures
 * Each framework has specific files that indicate its presence
 */
const FRAMEWORK_SIGNATURES = {
  'nextjs': {
    files: ['next.config.js', 'next.config.mjs', 'next.config.ts'],
    alternative: ['pages', 'app'],
    dependency: 'next'
  },
  'nuxtjs': {
    files: ['nuxt.config.js', 'nuxt.config.ts'],
    dependency: 'nuxt'
  },
  'react-vite': {
    files: ['vite.config.js', 'vite.config.ts'],
    dependency: 'react',
    devDependency: 'vite'
  },
  'angular': {
    files: ['angular.json'],
    alternative: ['.angular'],
    dependency: '@angular/core'
  },
  'react-native': {
    files: ['app.json', 'metro.config.js'],
    dependency: 'react-native'
  },
  'ionic-react': {
    files: ['ionic.config.json'],
    dependency: 'react'
  },
  'ionic-angular': {
    files: ['ionic.config.json'],
    dependency: '@angular/core'
  },
  'ionic-vue': {
    files: ['ionic.config.json'],
    dependency: 'vue'
  },
  'vue': {
    files: ['vue.config.js'],
    dependency: 'vue'
  }
};

/**
 * Detect project from a given path
 * @param {string} projectPath - Path to project directory
 * @returns {Promise<Object>} Detection results
 */
async function detectProject(projectPath) {
  try {
    // Ensure path is absolute
    const absolutePath = path.resolve(projectPath);
    
    // Check if directory exists
    if (!fs.existsSync(absolutePath)) {
      throw new Error('Directory does not exist');
    }
    
    // Check if it's a directory
    const stats = fs.statSync(absolutePath);
    if (!stats.isDirectory()) {
      throw new Error('Path is not a directory');
    }
    
    // Read package.json if exists
    const packageJson = await readPackageJson(absolutePath);
    
    // Detect framework
    const framework = await detectFramework(absolutePath, packageJson);
    
    // Extract project name
    const name = extractProjectName(absolutePath, packageJson);
    
    // Detect language
    const language = detectLanguage(absolutePath);
    
    // Detect package manager
    const packageManager = detectPackageManager(absolutePath);
    
    // Calculate confidence score
    const confidence = calculateConfidence(framework, packageJson, absolutePath);
    
    return {
      name,
      type: framework.type,
      language,
      packageManager,
      path: absolutePath,
      detected: framework.type !== 'unknown',
      confidence,
      metadata: {
        hasPackageJson: !!packageJson,
        hasGit: fs.existsSync(path.join(absolutePath, '.git')),
        packageJsonName: packageJson?.name
      }
    };
    
  } catch (error) {
    return {
      name: path.basename(projectPath),
      type: 'unknown',
      language: 'unknown',
      packageManager: 'npm',
      path: path.resolve(projectPath),
      detected: false,
      confidence: 0,
      error: error.message
    };
  }
}

/**
 * Read and parse package.json
 * @param {string} projectPath - Project directory path
 * @returns {Object|null} Parsed package.json or null
 */
async function readPackageJson(projectPath) {
  const packageJsonPath = path.join(projectPath, 'package.json');
  
  try {
    if (!fs.existsSync(packageJsonPath)) {
      return null;
    }
    
    const content = fs.readFileSync(packageJsonPath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
}

/**
 * Detect framework type
 * @param {string} projectPath - Project directory path
 * @param {Object} packageJson - Parsed package.json
 * @returns {Object} Framework detection result
 */
async function detectFramework(projectPath, packageJson) {
  // Priority 1: Check for specific config files
  for (const [framework, signature] of Object.entries(FRAMEWORK_SIGNATURES)) {
    // Check for primary config files
    const hasConfigFile = signature.files.some(file => 
      fs.existsSync(path.join(projectPath, file))
    );
    
    if (hasConfigFile) {
      // For frameworks that need additional verification
      if (signature.alternative) {
        const hasAlternative = signature.alternative.some(dir =>
          fs.existsSync(path.join(projectPath, dir))
        );
        
        if (hasAlternative) {
          return { type: framework, method: 'config-file' };
        }
      } else {
        return { type: framework, method: 'config-file' };
      }
    }
  }
  
  // Priority 2: Check package.json dependencies
  if (packageJson?.dependencies || packageJson?.devDependencies) {
    for (const [framework, signature] of Object.entries(FRAMEWORK_SIGNATURES)) {
      const deps = packageJson.dependencies || {};
      const devDeps = packageJson.devDependencies || {};
      
      const hasDependency = signature.dependency && deps[signature.dependency];
      const hasDevDependency = signature.devDependency && devDeps[signature.devDependency];
      
      if (hasDependency || hasDevDependency) {
        // Special handling for Ionic (needs framework check)
        if (framework.startsWith('ionic-')) {
          const ionicFramework = framework.replace('ionic-', '');
          if (deps[ionicFramework] || deps[signature.dependency]) {
            return { type: framework, method: 'dependency' };
          }
        } else {
          return { type: framework, method: 'dependency' };
        }
      }
    }
  }
  
  // Priority 3: Generic React/Vue detection
  if (packageJson?.dependencies?.react && !packageJson?.dependencies?.next) {
    return { type: 'react-vite', method: 'fallback' };
  }
  
  if (packageJson?.dependencies?.vue && !packageJson?.dependencies?.nuxt) {
    return { type: 'vue', method: 'fallback' };
  }
  
  return { type: 'unknown', method: 'none' };
}

/**
 * Extract project name from various sources
 * @param {string} projectPath - Project directory path
 * @param {Object} packageJson - Parsed package.json
 * @returns {string} Project name
 */
function extractProjectName(projectPath, packageJson) {
  // Priority 1: package.json name
  if (packageJson?.name) {
    return packageJson.name;
  }
  
  // Priority 2: Git remote origin (extract repo name)
  try {
    const gitOrigin = execSync('git config --get remote.origin.url', {
      cwd: projectPath,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore']
    }).trim();
    
    if (gitOrigin) {
      // Extract repo name from URL
      // https://github.com/user/repo.git -> repo
      // git@github.com:user/repo.git -> repo
      const match = gitOrigin.match(/\/([^\/]+?)(\.git)?$/);
      if (match && match[1]) {
        return match[1];
      }
    }
  } catch (error) {
    // Git command failed, continue to fallback
  }
  
  // Priority 3: Directory name
  return path.basename(projectPath);
}

/**
 * Detect programming language
 * @param {string} projectPath - Project directory path
 * @returns {string} Language (TypeScript or JavaScript)
 */
function detectLanguage(projectPath) {
  const tsconfigPath = path.join(projectPath, 'tsconfig.json');
  return fs.existsSync(tsconfigPath) ? 'TypeScript' : 'JavaScript';
}

/**
 * Detect package manager
 * @param {string} projectPath - Project directory path
 * @returns {string} Package manager name
 */
function detectPackageManager(projectPath) {
  if (fs.existsSync(path.join(projectPath, 'pnpm-lock.yaml'))) {
    return 'pnpm';
  }
  
  if (fs.existsSync(path.join(projectPath, 'yarn.lock'))) {
    return 'yarn';
  }
  
  if (fs.existsSync(path.join(projectPath, 'package-lock.json'))) {
    return 'npm';
  }
  
  // Check for bun
  if (fs.existsSync(path.join(projectPath, 'bun.lockb'))) {
    return 'bun';
  }
  
  return 'npm'; // Default
}

/**
 * Calculate confidence score for detection
 * @param {Object} framework - Framework detection result
 * @param {Object} packageJson - Parsed package.json
 * @param {string} projectPath - Project directory path
 * @returns {number} Confidence score (0-100)
 */
function calculateConfidence(framework, packageJson, projectPath) {
  let confidence = 0;
  
  // Unknown framework = 0 confidence
  if (framework.type === 'unknown') {
    return 0;
  }
  
  // Detection method scoring
  if (framework.method === 'config-file') {
    confidence += 70; // High confidence for config files
  } else if (framework.method === 'dependency') {
    confidence += 50; // Medium confidence for dependencies
  } else if (framework.method === 'fallback') {
    confidence += 30; // Lower confidence for fallback
  }
  
  // Bonus points
  if (packageJson) {
    confidence += 15; // Has package.json
  }
  
  if (fs.existsSync(path.join(projectPath, '.git'))) {
    confidence += 10; // Has git
  }
  
  if (packageJson?.scripts?.dev || packageJson?.scripts?.start) {
    confidence += 5; // Has dev scripts
  }
  
  return Math.min(confidence, 100);
}

/**
 * Validate if path is a valid project directory
 * @param {string} projectPath - Path to validate
 * @returns {Object} Validation result
 */
function validateProjectPath(projectPath) {
  const absolutePath = path.resolve(projectPath);
  
  // Check if exists
  if (!fs.existsSync(absolutePath)) {
    return {
      valid: false,
      error: 'Directory does not exist'
    };
  }
  
  // Check if directory
  const stats = fs.statSync(absolutePath);
  if (!stats.isDirectory()) {
    return {
      valid: false,
      error: 'Path is not a directory'
    };
  }
  
  // Check if has package.json (recommended but not required)
  const hasPackageJson = fs.existsSync(path.join(absolutePath, 'package.json'));
  
  return {
    valid: true,
    hasPackageJson,
    warning: !hasPackageJson ? 'No package.json found - project may not be recognized' : null
  };
}

module.exports = {
  detectProject,
  validateProjectPath,
  FRAMEWORK_SIGNATURES
};