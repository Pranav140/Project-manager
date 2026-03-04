/**
 * AI Routes
 * AI-powered features endpoints
 */

const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller');
const { createLimiter } = require('../middleware/rateLimiter');

// AI Description Generation
router.post('/generate-description', createLimiter, aiController.generateDescription);

// Task Suggestions
router.post('/task-suggestions', createLimiter, aiController.generateTaskSuggestions);

// Project Analysis
router.get('/analyze/:id', aiController.analyzeProject);

// Name Generation
router.post('/generate-names', createLimiter, aiController.generateProjectNames);

// Smart Search
router.get('/smart-search', aiController.smartSearch);

// README Generation
router.get('/generate-readme/:id', aiController.generateReadme);

// AI Insights Dashboard
router.get('/insights', aiController.getInsights);

module.exports = router;
