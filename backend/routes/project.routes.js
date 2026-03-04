/**
 * Project Routes
 * RESTful API endpoints for project management
 */

const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const { projectValidation } = require('../validators/project.validator');
const { validate } = require('../validators');
const upload = require('../utils/upload');

// GET /api/projects - Get all projects
router.get('/', projectController.getAllProjects);

// GET /api/projects/:id - Get single project
router.get('/:id', projectController.getProjectById);

// POST /api/projects - Create new project
router.post(
  '/',
  upload.single('image'),
  projectValidation,
  validate,
  projectController.createProject
);

// PUT /api/projects/:id - Update project
router.put(
  '/:id',
  upload.single('image'),
  projectValidation,
  validate,
  projectController.updateProject
);

// DELETE /api/projects/:id - Delete project
router.delete('/:id', projectController.deleteProject);

module.exports = router;
