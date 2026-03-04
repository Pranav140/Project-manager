/**
 * Profile Validation Rules
 */

const { body } = require('express-validator');

exports.profileValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 3, max: 100 }).withMessage('Name must be between 3 and 100 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 2500 }).withMessage('Bio cannot exceed 2500 characters'),
  
  body('website')
    .optional()
    .trim()
    .isURL().withMessage('Website must be a valid URL'),
  
  body('github')
    .optional()
    .trim()
    .isURL().withMessage('Github must be a valid URL'),
  
  body('linkedin')
    .optional()
    .trim()
    .isURL().withMessage('LinkedIn must be a valid URL')
];
