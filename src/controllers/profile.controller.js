/**
 * Profile Controller
 * Business logic for user profile management
 */

const Profile = require('../models/Profile');
const asyncHandler = require('../middleware/asyncHandler');
const { AppError } = require('../utils/errors');

/**
 * @desc    Get profile
 * @route   GET /api/profile
 * @access  Public
 */
exports.getProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne().select('-__v');

  if (!profile) {
    throw new AppError('Profile not found', 404);
  }

  res.status(200).json({
    success: true,
    data: profile
  });
});

/**
 * @desc    Create profile
 * @route   POST /api/profile
 * @access  Public
 */
exports.createProfile = asyncHandler(async (req, res) => {
  // Check if profile already exists
  const existingProfile = await Profile.findOne();
  if (existingProfile) {
    throw new AppError('Profile already exists. Use PUT to update.', 400);
  }

  const { name, email, bio, location, website, github, linkedin } = req.body;

  // Handle image upload
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const imagePath = req.file 
    ? `${baseUrl}/public/images/${req.file.filename}`
    : `${baseUrl}/public/images/placeholder.png`;

  const profile = await Profile.create({
    name,
    email,
    bio,
    location,
    website,
    github,
    linkedin,
    image: imagePath
  });

  res.status(201).json({
    success: true,
    message: 'Profile created successfully',
    data: profile
  });
});

/**
 * @desc    Update profile
 * @route   PUT /api/profile/:id
 * @access  Public
 */
exports.updateProfile = asyncHandler(async (req, res) => {
  let profile = await Profile.findById(req.params.id);

  if (!profile) {
    throw new AppError('Profile not found', 404);
  }

  const { name, email, bio, location, website, github, linkedin } = req.body;

  // Handle image upload
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  let imagePath = profile.image;
  
  if (req.file) {
    imagePath = `${baseUrl}/public/images/${req.file.filename}`;
  } else if (req.body.image === '') {
    imagePath = `${baseUrl}/public/images/placeholder.png`;
  } else if (req.body.image) {
    imagePath = req.body.image;
  }

  profile.name = name || profile.name;
  profile.email = email || profile.email;
  profile.bio = bio || profile.bio;
  profile.location = location || profile.location;
  profile.website = website || profile.website;
  profile.github = github || profile.github;
  profile.linkedin = linkedin || profile.linkedin;
  profile.image = imagePath;

  await profile.save();

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: profile
  });
});
