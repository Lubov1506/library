import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooksThunk } from "../../redux/books/operations";
import { selectBooks } from "../../redux/books/slice";
import ItemBook from "../ItemBook/ItemBook";
import s from './ListBooks.module.css'
const ListBooks = () => {
  const books = useSelector(selectBooks);
  console.log(books);
  
  return (
    <div>
      ListBooks
      {books && (
        <ul className={s.list_books}>
          {books.map((book, idx) => {
            return <ItemBook key={idx} book={book} />;
          })}
        </ul>
      )}
    </div>
  );
};
export default ListBooks;
