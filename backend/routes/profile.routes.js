/**
 * Profile Routes
 * RESTful API endpoints for user profile management
 */

const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');
const { profileValidation } = require('../validators/profile.validator');
const { validate } = require('../validators');
const upload = require('../utils/upload');

// GET /api/profile - Get profile
router.get('/', profileController.getProfile);

// POST /api/profile - Create profile
router.post(
  '/',
  upload.single('image'),
  profileValidation,
  validate,
  profileController.createProfile
);

// PUT /api/profile/:id - Update profile
router.put(
  '/:id',
  upload.single('image'),
  profileValidation,
  validate,
  profileController.updateProfile
);

module.exports = router;
