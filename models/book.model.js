const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  genre: {
    type: String,
    enum: ['fiction', 'science', 'history', 'technology', 'other'],
    default: 'other'
  },
  publishedYear: {
    type: Number,
    min: 1000
  },
  shelfLocation: {
    type: String
  },
  totalCopies: {
    type: Number,
    required: true,
    min: 1
  },
  availableCopies: {
    type: Number,
    min: 0,
    default: 1
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

bookSchema.index({ title: 1, author: 1 }, { unique: true });

module.exports = mongoose.model('Book', bookSchema);