/**
 * Stack Controller
 * Business logic for technology stack management
 */

const Stack = require('../models/Stack');
const asyncHandler = require('../middleware/asyncHandler');
const { AppError } = require('../utils/errors');

/**
 * @desc    Get all stacks
 * @route   GET /api/stacks
 * @access  Public
 */
exports.getAllStacks = asyncHandler(async (req, res) => {
  const stacks = await Stack.find()
    .select('-__v')
    .sort({ name: 1 });

  res.status(200).json({
    success: true,
    count: stacks.length,
    data: stacks
  });
});

/**
 * @desc    Get single stack by ID
 * @route   GET /api/stacks/:id
 * @access  Public
 */
exports.getStackById = asyncHandler(async (req, res) => {
  const stack = await Stack.findById(req.params.id).select('-__v');

  if (!stack) {
    throw new AppError('Stack not found', 404);
  }

  res.status(200).json({
    success: true,
    data: stack
  });
});

/**
 * @desc    Create new stack
 * @route   POST /api/stacks
 * @access  Public
 */
exports.createStack = asyncHandler(async (req, res) => {
  const { name, description, released_year } = req.body;

  // Check if stack already exists
  const existingStack = await Stack.findOne({ name });
  if (existingStack) {
    throw new AppError('Stack with this name already exists', 400);
  }

  const stack = await Stack.create({
    name,
    description,
    released_year: released_year ? parseInt(released_year) : undefined
  });

  res.status(201).json({
    success: true,
    message: 'Stack created successfully',
    data: stack
  });
});

/**
 * @desc    Update stack
 * @route   PUT /api/stacks/:id
 * @access  Public
 */
exports.updateStack = asyncHandler(async (req, res) => {
  let stack = await Stack.findById(req.params.id);

  if (!stack) {
    throw new AppError('Stack not found', 404);
  }

  const { name, description, released_year } = req.body;

  // Check if new name conflicts with existing stack
  if (name && name !== stack.name) {
    const existingStack = await Stack.findOne({ name });
    if (existingStack) {
      throw new AppError('Stack with this name already exists', 400);
    }
  }

  stack.name = name || stack.name;
  stack.description = description || stack.description;
  stack.released_year = released_year ? parseInt(released_year) : stack.released_year;

  await stack.save();

  res.status(200).json({
    success: true,
    message: 'Stack updated successfully',
    data: stack
  });
});

/**
 * @desc    Delete stack
 * @route   DELETE /api/stacks/:id
 * @access  Public
 */
exports.deleteStack = asyncHandler(async (req, res) => {
  const stack = await Stack.findById(req.params.id);

  if (!stack) {
    throw new AppError('Stack not found', 404);
  }

  await stack.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Stack deleted successfully',
    data: {}
  });
});
