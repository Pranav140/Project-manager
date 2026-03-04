/**
 * Project DNA Routes
 * Revolutionary AI features
 */

const express = require('express');
const router = express.Router();
const projectDNAController = require('../controllers/projectDNA.controller');

// Project DNA Generation
router.get('/generate/:id', projectDNAController.generateDNA);

// AI Time Traveler
router.get('/time-travel/:id', projectDNAController.timeTravel);

// Project Health Monitor
router.get('/health/:id', projectDNAController.analyzeHealth);

// Smart Relationships
router.get('/relationships', projectDNAController.discoverRelationships);

// Voice to Project
router.post('/voice-to-project', projectDNAController.voiceToProject);

// Viral Potential Predictor
router.get('/viral-potential/:id', projectDNAController.predictViralPotential);

// Ecosystem Analysis
router.get('/ecosystem', projectDNAController.getEcosystem);

module.exports = router;
