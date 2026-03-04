/**
 * Response Caching Middleware
 * Improves performance by caching responses
 */

const NodeCache = require('node-cache');

// Create cache instance (TTL: 5 minutes)
const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

/**
 * Cache middleware factory
 * @param {number} duration - Cache duration in seconds
 */
exports.cacheMiddleware = (duration = 300) => {
  return (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const key = req.originalUrl || req.url;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      return res.json(cachedResponse);
    }

    // Store original json function
    const originalJson = res.json.bind(res);

    // Override json function to cache response
    res.json = (body) => {
      cache.set(key, body, duration);
      return originalJson(body);
    };

    next();
  };
};

/**
 * Clear cache for specific pattern
 */
exports.clearCache = (pattern) => {
  const keys = cache.keys();
  keys.forEach(key => {
    if (key.includes(pattern)) {
      cache.del(key);
    }
  });
};

/**
 * Clear all cache
 */
exports.clearAllCache = () => {
  cache.flushAll();
};

module.exports.cache = cache;
