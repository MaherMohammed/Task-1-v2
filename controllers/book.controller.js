const Book = require('../models/book.model');

// Add a book (201 Created or 409 Conflict / 400 Validation)
const createBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: 'A book with this title and author already exists.' });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};

// Get all books with query-string filtering (Stretch Goal)
const getBooks = async (req, res) => {
    try {
        const filter = {};
        if (req.query.genre) {
            filter.genre = req.query.genre;
        }
        if (req.query.isAvailable !== undefined) {
            // Convert query string 'true'/'false' to boolean
            filter.isAvailable = req.query.isAvailable === 'true';
        }

        const books = await Book.find(filter);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get 5 most recently added books, newest first (Stretch Goal)
const getRecentBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(5);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get one book by ID (404 if not found)
const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a book by ID (with runValidators: true)
const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true // Ensures Mongoose schema validators run on updates
        });
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(updatedBook);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: 'A book with this title and author already exists.' });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};

// Delete a book by ID
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createBook,
    getBooks,
    getRecentBooks,
    getBookById,
    updateBook,
    deleteBook
};