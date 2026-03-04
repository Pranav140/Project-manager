/**
 * Stack Routes
 * RESTful API endpoints for technology stack management
 */

const express = require('express');
const router = express.Router();
const stackController = require('../controllers/stack.controller');
const { stackValidation } = require('../validators/stack.validator');
const { validate } = require('../validators');

// GET /api/stacks - Get all stacks
router.get('/', stackController.getAllStacks);

// GET /api/stacks/:id - Get single stack
router.get('/:id', stackController.getStackById);

// POST /api/stacks - Create new stack
router.post(
  '/',
  stackValidation,
  validate,
  stackController.createStack
);

// PUT /api/stacks/:id - Update stack
router.put(
  '/:id',
  stackValidation,
  validate,
  stackController.updateStack
);

// DELETE /api/stacks/:id - Delete stack
router.delete('/:id', stackController.deleteStack);

module.exports = router;
