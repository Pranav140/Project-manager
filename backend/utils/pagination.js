/**
 * Pagination Utility
 * Handles pagination for API responses
 */

/**
 * Paginate query results
 * @param {Object} query - Mongoose query
 * @param {Object} options - Pagination options
 */
exports.paginate = async (query, options = {}) => {
  const page = parseInt(options.page) || 1;
  const limit = parseInt(options.limit) || 10;
  const skip = (page - 1) * limit;

  // Execute query with pagination
  const results = await query.skip(skip).limit(limit);
  
  // Get total count
  const total = await query.model.countDocuments(query.getFilter());
  
  const totalPages = Math.ceil(total / limit);

  return {
    data: results,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems: total,
      itemsPerPage: limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};

/**
 * Get pagination params from request
 */
exports.getPaginationParams = (req) => {
  return {
    page: parseInt(req.query.page) || 1,
    limit: parseInt(req.query.limit) || 10,
    sort: req.query.sort || '-createdAt',
    search: req.query.search || '',
  };
};
