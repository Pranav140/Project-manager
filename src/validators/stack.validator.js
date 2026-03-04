/**
 * Stack Validation Rules
 */

const { body } = require('express-validator');

exports.stackValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Stack name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 15, max: 2000 }).withMessage('Description must be between 15 and 2000 characters'),
  
  body('released_year')
    .optional()
    .isInt({ min: 1950, max: 2100 }).withMessage('Year must be between 1950 and 2100'),
  
  body('link')
    .optional()
    .trim()
    .isURL().withMessage('Link must be a valid URL')
];
