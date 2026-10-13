const Book = require('../models/book.model.js');

const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'A book with this title and author already exists' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: error.message });
  }
};

const getBooks = async (req, res) => {
  try {
    const filters = {};

    if (req.query.genre !== undefined) {
      filters.genre = req.query.genre;
    }

    if (req.query.isAvailable !== undefined) {
      if (req.query.isAvailable !== 'true' && req.query.isAvailable !== 'false') {
        return res.status(400).json({ error: 'isAvailable must be true or false' });
      }

      filters.isAvailable = req.query.isAvailable === 'true';
    }

    const books = await Book.find(filters);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRecentBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'A book with this title and author already exists' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
