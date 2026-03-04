/**
 * Search Utility
 * Advanced search functionality
 */

/**
 * Build search query
 * @param {Object} Model - Mongoose model
 * @param {string} searchTerm - Search term
 * @param {Array} fields - Fields to search in
 */
exports.buildSearchQuery = (searchTerm, fields = []) => {
  if (!searchTerm) return {};

  const searchRegex = new RegExp(searchTerm, 'i');
  
  return {
    $or: fields.map(field => ({
      [field]: searchRegex
    }))
  };
};

/**
 * Build filter query from request
 */
exports.buildFilterQuery = (filters = {}) => {
  const query = {};

  Object.keys(filters).forEach(key => {
    if (filters[key] && filters[key] !== 'all') {
      query[key] = filters[key];
    }
  });

  return query;
};

/**
 * Build sort query
 */
exports.buildSortQuery = (sortBy = '-createdAt') => {
  // Handle multiple sort fields
  if (sortBy.includes(',')) {
    const sorts = sortBy.split(',');
    return sorts.join(' ');
  }
  return sortBy;
};
