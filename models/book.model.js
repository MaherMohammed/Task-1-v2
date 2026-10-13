const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true
    },
    genre: {
        type: String,
        enum: ['fiction', 'science', 'history', 'technology', 'other'],
        default: 'other'
    },
    publishedYear: {
        type: Number,
        min: [1000, 'Published year must be at least 1000']
    },
    shelfLocation: {
        type: String,
        trim: true
    },
    totalCopies: {
        type: Number,
        required: [true, 'Total copies is required'],
        min: [1, 'Total copies must be at least 1']
    },
    availableCopies: {
        type: Number,
        min: [0, 'Available copies cannot be negative'],
        default: 1
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

// Compound unique index so the same book can't be added twice by the same author
bookSchema.index({ title: 1, author: 1 }, { unique: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;