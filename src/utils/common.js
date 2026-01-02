/**
 * Format relative time (same as list.js)
 * @param {string} isoDate - ISO date string
 * @returns {string} Human-readable relative time
 */
function formatRelativeTime(isoDate) {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
  return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
}

/**
 * Get project type display name
 * @param {string} type - Project type key
 * @returns {string} Formatted display name
 */
function getTypeDisplay(type) {
  const typeMap = {
    'angular': 'Angular',
    'ionic-angular': 'Ionic+Angular',
    'ionic-react': 'Ionic+React',
    'ionic-vue': 'Ionic+Vue',
    'nextjs': 'Next.js',
    'nextjs-shadcn': 'Next+shadcn',
    'nuxtjs': 'Nuxt.js',
    'react-native': 'React Native',
    'react-vite': 'React+Vite',
    'react-vite-ts': 'React+Vite(TS)',
  };
  return typeMap[type] || type;
}

const formatPadEnd = (text, width = 40) =>
  `${text.padEnd(width)}`;

module.exports = {
    getTypeDisplay,
    formatRelativeTime,
    formatPadEnd
}