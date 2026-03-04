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
const aiRoutes = require('./ai.routes');
const projectDNARoutes = require('./projectDNA.routes');

// API info endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'Project Management API with AI',
    version: '2.0.0',
    features: {
      core: ['projects', 'stacks', 'profile'],
      ai: ['description-generation', 'task-suggestions', 'project-analysis', 'smart-search']
    },
    endpoints: {
      projects: '/api/projects',
      stacks: '/api/stacks',
      profile: '/api/profile',
      ai: '/api/ai',
      health: '/health'
    }
  });
});

// Mount routes
router.use('/projects', projectRoutes);
router.use('/stacks', stackRoutes);
router.use('/profile', profileRoutes);
router.use('/ai', aiRoutes);
router.use('/dna', projectDNARoutes);

module.exports = router;
