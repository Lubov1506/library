import s from "./ItemBook.module.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Modal from "../Modal/Modal";
import BookForm from "../BookForm/BookForm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteBookThunk,
  markAsBorrowedThunk,
} from "../../redux/books/operations";
import Button from "../Button/Button";
import clsx from "clsx";

const ItemBook = ({ book }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const handleDelete = (bookISBN) => {
    dispatch(deleteBookThunk(bookISBN));
  };
  const handleMarkBorrowed = (bookISBN) => {
    dispatch(markAsBorrowedThunk(bookISBN));
  };
  return (
    <>
      <li className={s.item_book}>
        <Button
          className={clsx(s.is_borrowed, { [s.is_returned]: !book.isBorrowed })}
          type="button"
          onClick={() => handleMarkBorrowed(book.isbn)}
        >
          {book.isBorrowed ? "Borrowed" : "Returned"}
        </Button>
        <div className={s.book_info}>
          <h2>{book.title}</h2>
          <p>{book.author}</p>
          <p className={s.isbn}>{book.isbn}</p>
        </div>
        <div className={s.btns}>
          <button onClick={openModal}>
            <MdEdit />
          </button>
          <button onClick={() => handleDelete(book.isbn)}>
            <FaRegTrashAlt />
          </button>
        </div>
      </li>
      {isOpen && (
        <Modal title="Update book info" onClose={closeModal}>
          <BookForm type="update" book={book} onClose={closeModal} />
        </Modal>
      )}
    </>
  );
};
export default ItemBook;
