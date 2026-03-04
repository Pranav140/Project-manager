/**
 * Project DNA Controller
 * Revolutionary AI features for project management
 */

const asyncHandler = require('../middleware/asyncHandler');
const projectDNAService = require('../services/projectDNA.service');
const Project = require('../models/Project');
const { ValidationError } = require('../utils/errors');

/**
 * @route   GET /api/dna/generate/:id
 * @desc    Generate unique DNA for a project
 * @access  Public
 */
exports.generateDNA = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id).populate('stack');
  
  if (!project) {
    throw new ValidationError('Project not found');
  }

  const dna = await projectDNAService.generateProjectDNA(project);

  res.json({
    success: true,
    data: {
      projectId: project._id,
      projectName: project.name,
      dna
    }
  });
});

/**
 * @route   GET /api/dna/time-travel/:id
 * @desc    AI Time Traveler - See project's past and possible futures
 * @access  Public
 */
exports.timeTravel = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id).populate('stack');
  
  if (!project) {
    throw new ValidationError('Project not found');
  }

  const timeline = await projectDNAService.timeTravel(project);

  res.json({
    success: true,
    data: {
      projectId: project._id,
      projectName: project.name,
      timeline
    }
  });
});

/**
 * @route   GET /api/dna/health/:id
 * @desc    Project Health Monitor - Real-time health analysis
 * @access  Public
 */
exports.analyzeHealth = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id).populate('stack');
  
  if (!project) {
    throw new ValidationError('Project not found');
  }

  const health = await projectDNAService.analyzeProjectHealth(project);

  res.json({
    success: true,
    data: {
      projectId: project._id,
      projectName: project.name,
      health
    }
  });
});

/**
 * @route   GET /api/dna/relationships
 * @desc    Discover smart relationships between all projects
 * @access  Public
 */
exports.discoverRelationships = asyncHandler(async (req, res) => {
  const projects = await Project.find().populate('stack').limit(20);
  
  if (projects.length < 2) {
    throw new ValidationError('Need at least 2 projects to discover relationships');
  }

  const relationships = await projectDNAService.discoverRelationships(projects);

  res.json({
    success: true,
    data: {
      totalProjects: projects.length,
      relationships
    }
  });
});

/**
 * @route   POST /api/dna/voice-to-project
 * @desc    Convert voice transcription to complete project
 * @access  Public
 */
exports.voiceToProject = asyncHandler(async (req, res) => {
  const { transcription } = req.body;

  if (!transcription || transcription.trim().length < 10) {
    throw new ValidationError('Transcription must be at least 10 characters');
  }

  const projectSpec = await projectDNAService.voiceToProject(transcription);

  res.json({
    success: true,
    data: {
      originalTranscription: transcription,
      generatedProject: projectSpec
    }
  });
});

/**
 * @route   GET /api/dna/viral-potential/:id
 * @desc    Predict if project will go viral
 * @access  Public
 */
exports.predictViralPotential = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id).populate('stack');
  
  if (!project) {
    throw new ValidationError('Project not found');
  }

  const prediction = await projectDNAService.predictViralPotential(project);

  res.json({
    success: true,
    data: {
      projectId: project._id,
      projectName: project.name,
      prediction
    }
  });
});

/**
 * @route   GET /api/dna/ecosystem
 * @desc    Get complete project ecosystem analysis
 * @access  Public
 */
exports.getEcosystem = asyncHandler(async (req, res) => {
  const projects = await Project.find().populate('stack');
  
  const [relationships, healthScores] = await Promise.all([
    projects.length >= 2 ? projectDNAService.discoverRelationships(projects) : null,
    Promise.all(projects.slice(0, 5).map(p => 
      projectDNAService.analyzeProjectHealth(p).catch(() => null)
    ))
  ]);

  res.json({
    success: true,
    data: {
      totalProjects: projects.length,
      ecosystem: relationships?.ecosystem || 'Not enough projects',
      clusters: relationships?.clusters || [],
      topProjectsHealth: healthScores.filter(Boolean),
      recommendations: relationships?.recommendations || []
    }
  });
});
