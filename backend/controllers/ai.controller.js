/**
 * AI Controller
 * Handles AI-powered features
 */

const asyncHandler = require('../middleware/asyncHandler');
const aiService = require('../services/ai.service');
const Project = require('../models/Project');
const Stack = require('../models/Stack');

/**
 * @desc    Generate AI project description
 * @route   POST /api/ai/generate-description
 * @access  Public
 */
exports.generateDescription = asyncHandler(async (req, res) => {
  const { projectName, techStack } = req.body;

  if (!projectName || !techStack || techStack.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Project name and tech stack are required'
    });
  }

  const description = await aiService.generateProjectDescription(projectName, techStack);

  res.status(200).json({
    success: true,
    data: {
      description,
      generatedAt: new Date().toISOString()
    }
  });
});

/**
 * @desc    Generate smart task suggestions
 * @route   POST /api/ai/task-suggestions
 * @access  Public
 */
exports.generateTaskSuggestions = asyncHandler(async (req, res) => {
  const { projectName, projectDescription, currentStatus } = req.body;

  if (!projectName || !projectDescription) {
    return res.status(400).json({
      success: false,
      error: 'Project name and description are required'
    });
  }

  const tasks = await aiService.generateTaskSuggestions(
    projectName,
    projectDescription,
    currentStatus || 'Development'
  );

  res.status(200).json({
    success: true,
    data: {
      tasks,
      generatedAt: new Date().toISOString()
    }
  });
});

/**
 * @desc    Analyze project complexity
 * @route   GET /api/ai/analyze/:id
 * @access  Public
 */
exports.analyzeProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id).populate('stack', 'name');

  if (!project) {
    return res.status(404).json({
      success: false,
      error: 'Project not found'
    });
  }

  const analysis = await aiService.analyzeProjectComplexity(project);

  res.status(200).json({
    success: true,
    data: {
      project: {
        id: project._id,
        name: project.name
      },
      analysis,
      analyzedAt: new Date().toISOString()
    }
  });
});

/**
 * @desc    Generate project name suggestions
 * @route   POST /api/ai/generate-names
 * @access  Public
 */
exports.generateProjectNames = asyncHandler(async (req, res) => {
  const { description, techStack } = req.body;

  if (!description || !techStack || techStack.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Description and tech stack are required'
    });
  }

  const names = await aiService.generateProjectNames(description, techStack);

  res.status(200).json({
    success: true,
    data: {
      suggestions: names,
      generatedAt: new Date().toISOString()
    }
  });
});

/**
 * @desc    AI-enhanced search
 * @route   GET /api/ai/smart-search
 * @access  Public
 */
exports.smartSearch = asyncHandler(async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({
      success: false,
      error: 'Search query is required'
    });
  }

  // Perform basic search
  const searchRegex = new RegExp(query, 'i');
  const results = await Project.find({
    $or: [
      { name: searchRegex },
      { description: searchRegex }
    ]
  })
    .populate('stack', 'name')
    .limit(10)
    .lean();

  // Enhance with AI
  const enhancedResults = await aiService.enhanceSearchResults(query, results);

  res.status(200).json({
    success: true,
    data: {
      query,
      results: enhancedResults,
      count: enhancedResults.length,
      aiEnhanced: true
    }
  });
});

/**
 * @desc    Generate project README
 * @route   GET /api/ai/generate-readme/:id
 * @access  Public
 */
exports.generateReadme = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id).populate('stack', 'name');

  if (!project) {
    return res.status(404).json({
      success: false,
      error: 'Project not found'
    });
  }

  const readme = await aiService.generateProjectReadme(project);

  res.status(200).json({
    success: true,
    data: {
      project: {
        id: project._id,
        name: project.name
      },
      readme,
      generatedAt: new Date().toISOString()
    }
  });
});

/**
 * @desc    Get AI insights dashboard
 * @route   GET /api/ai/insights
 * @access  Public
 */
exports.getInsights = asyncHandler(async (req, res) => {
  const projects = await Project.find().populate('stack', 'name').limit(5);
  const stacks = await Stack.find();

  // Generate insights
  const insights = {
    totalProjects: await Project.countDocuments(),
    totalStacks: stacks.length,
    statusDistribution: await Project.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]),
    topStacks: await Project.aggregate([
      { $unwind: '$stack' },
      { $group: { _id: '$stack', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]),
    recentProjects: projects.length,
    aiPowered: true,
    generatedAt: new Date().toISOString()
  };

  res.status(200).json({
    success: true,
    data: insights
  });
});
