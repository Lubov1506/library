import express from 'express';
import { addBook, deleteBook, getAllBooks, searchBooks, markAsBorrowed, updateBook } from '../controllers/bookControllers.js';

const bookRouter = express.Router()

bookRouter.get('/', getAllBooks);
bookRouter.post('/', addBook);
bookRouter.put('/:isbn', updateBook);
bookRouter.delete('/:isbn', deleteBook);
bookRouter.patch('/:isbn/borrow', markAsBorrowed);
bookRouter.get('/search', searchBooks)



export default bookRouter