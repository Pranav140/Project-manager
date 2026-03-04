/**
 * Profile Model
 * Mongoose schema for user profile
 */

const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [3, 'Name must be at least 3 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address'
    ]
  },
  bio: {
    type: String,
    trim: true,
    maxlength: [2500, 'Bio cannot exceed 2500 characters']
  },
  location: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  github: {
    type: String,
    trim: true
  },
  linkedin: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    default: '/public/images/placeholder.png'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for profile URL
ProfileSchema.virtual('url').get(function() {
  return `/profile/${this._id}`;
});

module.exports = mongoose.model('Profile', ProfileSchema);
