const express = require('express');
const router = express.Router();
const {
    createBook,
    getBooks,
    getRecentBooks,
    getBookById,
    updateBook,
    deleteBook
} = require('../controllers/book.controller');

// Stretch Goal Route (Must be placed before /:id)
router.get('/recent', getRecentBooks);

router.get('/', getBooks);
router.post('/', createBook);
router.get('/:id', getBookById);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;