/**
 * Project Validation Rules
 */

const { body } = require('express-validator');

exports.projectValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Project name is required')
    .isLength({ min: 3, max: 100 }).withMessage('Name must be between 3 and 100 characters'),
  
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 15, max: 2000 }).withMessage('Description must be between 15 and 2000 characters'),
  
  body('year')
    .optional()
    .isInt({ min: 1980, max: 2100 }).withMessage('Year must be between 1980 and 2100'),
  
  body('status')
    .optional()
    .isIn(['Development', 'Standby', 'Production']).withMessage('Invalid status'),
  
  body('github')
    .optional()
    .trim()
    .isURL().withMessage('Github must be a valid URL'),
  
  body('liveLink')
    .optional()
    .trim()
    .isURL().withMessage('Live link must be a valid URL')
];
