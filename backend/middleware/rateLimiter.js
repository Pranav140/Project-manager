/**
 * Rate Limiting Middleware
 * Prevents abuse and DDoS attacks
 */

const rateLimit = require('express-rate-limit');

// General API rate limiter
exports.apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict limiter for creation endpoints
exports.createLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // Limit each IP to 20 create requests per hour
  message: {
    success: false,
    error: 'Too many creation requests, please try again later.'
  },
  skipSuccessfulRequests: true,
});

// Upload limiter
exports.uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit uploads
  message: {
    success: false,
    error: 'Too many upload requests, please try again later.'
  },
});
