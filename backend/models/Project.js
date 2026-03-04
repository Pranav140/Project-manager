/**
 * Project Model
 * Mongoose schema for projects
 */

const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true,
    minlength: [3, 'Name must be at least 3 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
    minlength: [15, 'Description must be at least 15 characters'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  stack: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stack'
  }],
  year: {
    type: Number,
    min: [1980, 'Year must be after 1980'],
    max: [2100, 'Year must be before 2100']
  },
  image: {
    type: String,
    default: '/public/images/placeholder.png'
  },
  links: {
    type: Map,
    of: String,
    default: new Map()
  },
  status: {
    type: String,
    enum: {
      values: ['Development', 'Standby', 'Production'],
      message: '{VALUE} is not a valid status'
    },
    default: 'Development'
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for project URL
ProjectSchema.virtual('url').get(function() {
  return `/projects/${this._id}`;
});

// Index for faster queries
ProjectSchema.index({ name: 1 });
ProjectSchema.index({ status: 1 });
ProjectSchema.index({ year: -1 });

module.exports = mongoose.model('Project', ProjectSchema);
