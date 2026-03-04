/**
 * Stack Model
 * Mongoose schema for technology stacks
 */

const mongoose = require('mongoose');

const StackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Stack name is required'],
    unique: true,
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Stack description is required'],
    trim: true,
    minlength: [15, 'Description must be at least 15 characters'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  released_year: {
    type: Number,
    min: [1950, 'Year must be after 1950'],
    max: [2100, 'Year must be before 2100']
  },
  link: {
    type: String,
    trim: true
  },
  logo: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for stack URL
StackSchema.virtual('url').get(function() {
  return `/stacks/${this._id}`;
});

// Index for faster queries
StackSchema.index({ name: 1 });

module.exports = mongoose.model('Stack', StackSchema);
