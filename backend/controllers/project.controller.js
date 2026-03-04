/**
 * Project Controller
 * Business logic for project management
 */

const Project = require('../models/Project');
const Stack = require('../models/Stack');
const asyncHandler = require('../middleware/asyncHandler');
const { AppError } = require('../utils/errors');

/**
 * @desc    Get all projects
 * @route   GET /api/projects
 * @access  Public
 */
exports.getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find()
    .select('-__v')
    .populate('stack', 'name')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects
  });
});

/**
 * @desc    Get single project by ID
 * @route   GET /api/projects/:id
 * @access  Public
 */
exports.getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)
    .select('-__v')
    .populate('stack', 'name description');

  if (!project) {
    throw new AppError('Project not found', 404);
  }

  res.status(200).json({
    success: true,
    data: project
  });
});

/**
 * @desc    Create new project
 * @route   POST /api/projects
 * @access  Public
 */
exports.createProject = asyncHandler(async (req, res) => {
  const { name, description, year, stack, github, liveLink, status } = req.body;

  // Handle stack array
  let stackArray = [];
  if (stack) {
    stackArray = Array.isArray(stack) ? stack : [stack];
  }

  // Handle image upload
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const imagePath = req.file 
    ? `${baseUrl}/public/images/${req.file.filename}`
    : `${baseUrl}/public/images/placeholder.png`;

  // Create project
  const project = await Project.create({
    name,
    description,
    year: parseInt(year),
    stack: stackArray,
    image: imagePath,
    status: status || 'Development',
    links: new Map()
  });

  // Add links if provided
  if (github) {
    project.links.set('Github', github);
  }
  if (liveLink) {
    project.links.set('Live Link', liveLink);
  }

  await project.save();

  // Populate stack before sending response
  await project.populate('stack', 'name');

  res.status(201).json({
    success: true,
    message: 'Project created successfully',
    data: project
  });
});

/**
 * @desc    Update project
 * @route   PUT /api/projects/:id
 * @access  Public
 */
exports.updateProject = asyncHandler(async (req, res) => {
  let project = await Project.findById(req.params.id);

  if (!project) {
    throw new AppError('Project not found', 404);
  }

  const { name, description, year, stack, github, liveLink, status } = req.body;

  // Handle stack array
  let stackArray = [];
  if (stack) {
    if (Array.isArray(stack)) {
      stackArray = stack;
    } else if (typeof stack === 'string') {
      stackArray = stack.includes(',') ? stack.split(',') : [stack];
    }
  }

  // Handle image upload
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  let imagePath = project.image;
  
  if (req.file) {
    imagePath = `${baseUrl}/public/images/${req.file.filename}`;
  } else if (req.body.image === '') {
    imagePath = `${baseUrl}/public/images/placeholder.png`;
  } else if (req.body.image) {
    imagePath = req.body.image;
  }

  // Update project fields
  project.name = name || project.name;
  project.description = description || project.description;
  project.year = year ? parseInt(year) : project.year;
  project.stack = stackArray.length > 0 ? stackArray : project.stack;
  project.image = imagePath;
  project.status = status || project.status;
  project.updated_at = Date.now();

  // Update links
  if (github) {
    project.links.set('Github', github);
  }
  if (liveLink) {
    project.links.set('Live Link', liveLink);
  }

  await project.save();
  await project.populate('stack', 'name');

  res.status(200).json({
    success: true,
    message: 'Project updated successfully',
    data: project
  });
});

/**
 * @desc    Delete project
 * @route   DELETE /api/projects/:id
 * @access  Public
 */
exports.deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    throw new AppError('Project not found', 404);
  }

  await project.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Project deleted successfully',
    data: {}
  });
});
