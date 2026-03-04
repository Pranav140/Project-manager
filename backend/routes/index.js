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
    name: 'Helix API',
    message: 'Helix - Unwind your project\'s potential',
    version: '1.0.0',
    description: 'Revolutionary AI-powered project management platform',
    features: {
      core: ['projects', 'stacks', 'profile'],
      ai: ['description-generation', 'task-suggestions', 'project-analysis', 'smart-search'],
      revolutionary: ['project-dna', 'time-traveler', 'health-monitor', 'smart-relationships', 'voice-to-project', 'viral-predictor']
    },
    endpoints: {
      projects: '/api/projects',
      stacks: '/api/stacks',
      profile: '/api/profile',
      ai: '/api/ai',
      dna: '/api/dna',
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
