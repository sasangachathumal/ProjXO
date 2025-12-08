/**
 * Projects storage management
 * CRUD operations for project tracking
 */

const { randomUUID } = require('crypto');
const fs = require('fs');
const { readProjects, writeProjects } = require('./database');

/**
 * Add a new project to tracking
 * @param {Object} projectData - Project information
 * @param {string} projectData.name - Project name
 * @param {string} projectData.path - Full path to project
 * @param {string} projectData.type - Project type (react-vite, nextjs, etc.)
 * @param {string} [projectData.ide] - IDE used to open
 * @returns {Object} Created project object with ID
 */
function addProject({ name, path, type, ide = null }) {
  const data = readProjects();
  
  // Check if project already exists
  const existing = data.projects.find(p => p.path === path);
  if (existing) {
    // Update existing project
    existing.lastAccessed = new Date().toISOString();
    existing.type = type;
    if (ide) existing.ide = ide;
    writeProjects(data);
    return existing;
  }
  
  // Create new project entry
  const project = {
    id: randomUUID(),
    name,
    path,
    type,
    createdAt: new Date().toISOString(),
    lastAccessed: new Date().toISOString(),
    ide: ide || null,
    bookmarked: false,
    tags: []
  };
  
  data.projects.push(project);
  writeProjects(data);
  
  return project;
}

/**
 * Get all projects
 * @param {Object} options - Filter options
 * @param {boolean} [options.bookmarkedOnly] - Return only bookmarked projects
 * @param {string} [options.type] - Filter by project type
 * @returns {Array} Array of project objects
 */
function getAllProjects({ bookmarkedOnly = false, type = null } = {}) {
  const data = readProjects();
  let projects = data.projects;
  
  // Filter bookmarked
  if (bookmarkedOnly) {
    projects = projects.filter(p => p.bookmarked);
  }
  
  // Filter by type
  if (type) {
    projects = projects.filter(p => p.type === type);
  }
  
  // Sort by last accessed (most recent first)
  projects.sort((a, b) => 
    new Date(b.lastAccessed) - new Date(a.lastAccessed)
  );
  
  return projects;
}

/**
 * Get project by name (fuzzy match)
 * @param {string} name - Project name to search for
 * @returns {Object|null} Project object or null if not found
 */
function getProjectByName(name) {
  const data = readProjects();
  
  // Try exact match first
  let project = data.projects.find(p => 
    p.name.toLowerCase() === name.toLowerCase()
  );
  
  if (project) return project;
  
  // Try partial match
  project = data.projects.find(p => 
    p.name.toLowerCase().includes(name.toLowerCase())
  );
  
  return project || null;
}

/**
 * Get project by ID
 * @param {string} id - Project ID
 * @returns {Object|null} Project object or null if not found
 */
function getProjectById(id) {
  const data = readProjects();
  return data.projects.find(p => p.id === id) || null;
}

/**
 * Get project by path
 * @param {string} path - Project path
 * @returns {Object|null} Project object or null if not found
 */
function getProjectByPath(path) {
  const data = readProjects();
  return data.projects.find(p => p.path === path) || null;
}

/**
 * Update project
 * @param {string} id - Project ID
 * @param {Object} updates - Fields to update
 * @returns {Object|null} Updated project or null if not found
 */
function updateProject(id, updates) {
  const data = readProjects();
  const project = data.projects.find(p => p.id === id);
  
  if (!project) return null;
  
  // Update fields
  Object.assign(project, updates);
  project.lastAccessed = new Date().toISOString();
  
  writeProjects(data);
  return project;
}

/**
 * Update project's last accessed time
 * @param {string} id - Project ID
 */
function touchProject(id) {
  updateProject(id, { lastAccessed: new Date().toISOString() });
}

/**
 * Delete project from tracking
 * @param {string} id - Project ID
 * @returns {boolean} True if deleted, false if not found
 */
function deleteProject(id) {
  const data = readProjects();
  const index = data.projects.findIndex(p => p.id === id);
  
  if (index === -1) return false;
  
  data.projects.splice(index, 1);
  writeProjects(data);
  
  return true;
}

/**
 * Toggle bookmark status
 * @param {string} id - Project ID
 * @returns {Object|null} Updated project or null if not found
 */
function toggleBookmark(id) {
  const data = readProjects();
  const project = data.projects.find(p => p.id === id);
  
  if (!project) return null;
  
  project.bookmarked = !project.bookmarked;
  writeProjects(data);
  
  return project;
}

/**
 * Set bookmark status
 * @param {string} id - Project ID
 * @param {boolean} bookmarked - Bookmark status
 * @returns {Object|null} Updated project or null if not found
 */
function setBookmark(id, bookmarked) {
  const data = readProjects();
  const project = data.projects.find(p => p.id === id);
  
  if (!project) return null;
  
  project.bookmarked = bookmarked;
  writeProjects(data);
  
  return project;
}

/**
 * Get recently accessed projects
 * @param {number} limit - Maximum number of projects to return
 * @returns {Array} Array of recent project objects
 */
function getRecentProjects(limit = 10) {
  const data = readProjects();
  
  return data.projects
    .sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed))
    .slice(0, limit);
}

/**
 * Search projects by query
 * @param {string} query - Search query
 * @returns {Array} Array of matching project objects
 */
function searchProjects(query) {
  const data = readProjects();
  const lowerQuery = query.toLowerCase();
  
  return data.projects.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.type.toLowerCase().includes(lowerQuery) ||
    p.path.toLowerCase().includes(lowerQuery) ||
    (p.tags && p.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
  );
}

/**
 * Clean projects that no longer exist on disk
 * @returns {Array} Array of removed project paths
 */
function cleanProjects() {
  const data = readProjects();
  const removed = [];
  
  data.projects = data.projects.filter(p => {
    if (!fs.existsSync(p.path)) {
      removed.push(p.path);
      return false;
    }
    return true;
  });
  
  if (removed.length > 0) {
    writeProjects(data);
  }
  
  return removed;
}

/**
 * Get project statistics
 * @returns {Object} Statistics object
 */
function getProjectStats() {
  const data = readProjects();
  
  // Count by type
  const byType = {};
  data.projects.forEach(p => {
    byType[p.type] = (byType[p.type] || 0) + 1;
  });
  
  // Most used IDE
  const ideCount = {};
  data.projects.forEach(p => {
    if (p.ide) {
      ideCount[p.ide] = (ideCount[p.ide] || 0) + 1;
    }
  });
  
  const mostUsedIDE = Object.entries(ideCount)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';
  
  return {
    total: data.projects.length,
    bookmarked: data.projects.filter(p => p.bookmarked).length,
    byType,
    mostUsedIDE,
    oldest: data.projects.sort((a, b) => 
      new Date(a.createdAt) - new Date(b.createdAt)
    )[0],
    newest: data.projects.sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    )[0]
  };
}

module.exports = {
  addProject,
  getAllProjects,
  getProjectByName,
  getProjectById,
  getProjectByPath,
  updateProject,
  touchProject,
  deleteProject,
  toggleBookmark,
  setBookmark,
  getRecentProjects,
  searchProjects,
  cleanProjects,
  getProjectStats
};