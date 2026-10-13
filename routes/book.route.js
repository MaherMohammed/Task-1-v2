const express = require('express');
const router = express.Router();
const {
  createBook, getBooks, getRecentBooks, getBook, updateBook, deleteBook,
} = require('../controllers/book.controller');

router.post('/', createBook);
router.get('/', getBooks);
router.get('/recent', getRecentBooks);   // BEFORE '/:id'
router.get('/:id', getBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;