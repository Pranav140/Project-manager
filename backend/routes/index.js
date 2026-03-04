/**
 * API Routes Index
 * Central routing configuration
 */

const express = require('express');
const router = express.Router();

// Import route modules
const projectRoutes = require('./project.routes');
const stackRoutes = require('./stack.routes');
const profileRoutes = require('./profile.routes');

// API info endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'Project Management API',
    version: '1.0.0',
    endpoints: {
      projects: '/api/projects',
      stacks: '/api/stacks',
      profile: '/api/profile',
      health: '/health'
    }
  });
});

// Mount routes
router.use('/projects', projectRoutes);
router.use('/stacks', stackRoutes);
router.use('/profile', profileRoutes);

module.exports = router;
