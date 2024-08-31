import { useSelector } from "react-redux";
import {
  selectBooks,
  selectSearchBooks,
  selectSearchMessage,
} from "../../redux/books/slice";
import ItemBook from "../ItemBook/ItemBook";
import s from "./ListBooks.module.css";

const ListBooks = () => {
  const books = useSelector(selectBooks);
  const searchBooks = useSelector(selectSearchBooks);
  const searchMessage = useSelector(selectSearchMessage);

  return (
    <section className={s.list_books_wrap}>
      <h2>Your books</h2>
      {searchMessage && <p>{searchMessage}</p>}
      {!searchMessage && !!searchBooks.length && (
        <ul className={s.list_books}>
          {searchBooks.map((book, idx) => {
            return <ItemBook key={idx} book={book} />;
          })}
        </ul>
      )}
      {!books.length && (
        <p className={s.empty_list_info}>
          You don&apos;t have any book yet, add one right now!
        </p>
      )}
    </section>
  );
};
export default ListBooks;
