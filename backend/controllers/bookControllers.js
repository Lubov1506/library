import fs from "fs";
import { generateRandomISBN } from "../helpers/generateRandomISBN.js";
const DB_FILE = "../backend/db/db.json";

const loadBooks = () => {
  const data = fs.readFileSync(DB_FILE);
  if(!data){
    return 'Not books'
  }
  return JSON.parse(data).books;
};
const saveBooks = (books) => {
  fs.writeFileSync(DB_FILE, JSON.stringify({books:[ ...books ]}, null, 2));
};

export const getAllBooks = (req, res) => {
  const books = loadBooks();
  
  res.json(books);
};
export const createBook = (req, res) => {
  const books = loadBooks();
  const { title, author, isBorrowed = false } = req.body;
  const newBook = {
    isbn: generateRandomISBN(),
    title,
    author,
    isBorrowed,
  };
  books.push(newBook);
  saveBooks(books);
  res.status(201).json({
    message: "Book created successfully",
    newBook,
  });
};
export const updateBook = (req, res) => {
  const books = loadBooks();
  const { isbn } = req.params;

  let bookIndex;
  if (isbn) {
    bookIndex = books.findIndex((book) => book.isbn === isbn);
    
    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book not found" });
    }
    books[bookIndex] = { ...books[bookIndex], ...req.body };
  }
  saveBooks(books);
  res.json({
    message: "Book updated successfully",
    updatedBook: books[bookIndex],
  });
};

export const deleteBook = (req, res) => {
  let books = loadBooks();
  
  const { isbn } = req.params;
  if (books.length && isbn) {
    books = books.filter((book) => book.isbn !== isbn);
    saveBooks(books);
    res.status(204).send();
  }
};

export const toggleBorrow = (req, res) => {
  const books = loadBooks();
  const book = books.find((book) => book.isbn === req.params.isbn);
  if (!book) {
    res.status(404).json({ message: "Book not found" });
  }
  book.isBorrowed = !book.isBorrowed;
  saveBooks(books);
  res.json(book);
};

export const searchBooks = (req, res) => {
  const query = req.query.query.toLowerCase();
  const books = loadBooks();
  const results = books.filter(
    (book) =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.isbn.includes(query)
  );
  if(!results.length){
    res.json({message: 'That book not found'})
  }
  res.json(results)
};
