const express = require('express');
const bookController = require('../controllers/book.controller.js');

const router = express.Router();

router.get('/', bookController.getBooks);
router.get('/recent', bookController.getRecentBooks);
router.get('/:id', bookController.getBookById);
router.post('/', bookController.createBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;