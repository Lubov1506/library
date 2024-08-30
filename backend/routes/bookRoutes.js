import express from 'express';
import { createBook, deleteBook, getAllBooks, searchBooks, toggleBorrow, updateBook } from '../controllers/bookControllers.js';

const bookRouter = express.Router()

bookRouter.get('/', getAllBooks);
bookRouter.post('/', createBook);
bookRouter.put('/:isbn', updateBook);
bookRouter.delete('/:isbn', deleteBook);
bookRouter.patch('/:isbn/borrow', toggleBorrow);
bookRouter.get('/search', searchBooks)



export default bookRouter