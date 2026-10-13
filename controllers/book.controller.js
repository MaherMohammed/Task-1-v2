const Book = require('../models/book.model');

// Shared error mapper so every handler behaves the same
const handleError = (res, error) => {
  if (error.code === 11000) {
    return res.status(409).json({ message: 'Book already exists for this author' });
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ message: error.message });
  }
  return res.status(500).json({ message: error.message });
};

const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    handleError(res, error);
  }
};

//const getBooks = async (req, res) => {
  //try {
    //const filter = {};
    //if (req.query.genre) filter.genre = req.query.genre;
    //if (req.query.isAvailable !== undefined) {
      //filter.isAvailable = req.query.isAvailable === 'true';
    //}
    //const books = await Book.find(filter);
    //res.status(200).json(books);
  //} catch (error) {
    //handleError(res, error);
  //}
//};

const getBooks = async (req, res) => {
  try {
    const filter = {};
    if (req.query.genre) filter.genre = req.query.genre;
    if (req.query.isAvailable !== undefined) {
      filter.isAvailable = req.query.isAvailable === 'true';
    }
    if (req.query.title) filter.title = req.query.title;   // exact match
    const books = await Book.find(filter);
    res.status(200).json(books);
  } catch (error) {
    handleError(res, error);
  }
};

const getRecentBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).json(books);
  } catch (error) {
    handleError(res, error);
  }
};

const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
  } catch (error) {
    handleError(res, error);
  }
};

const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,            // return the updated doc, not the old one
      runValidators: true,  // run schema validators on update
    });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
  } catch (error) {
    handleError(res, error);
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = { createBook, getBooks, getRecentBooks, getBook, updateBook, deleteBook };