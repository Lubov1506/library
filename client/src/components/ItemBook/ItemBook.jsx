import s from "./ItemBook.module.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Modal from "../Modal/Modal";
import BookForm from "../BookForm/BookForm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBookThunk } from "../../redux/books/operations";
const ItemBook = ({ book }) => {
    const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const handleDelete = (bookISBN)=>{
    dispatch(deleteBookThunk(bookISBN))
  }
  return (
    <>
      <li className={s.item_book}>
        <h2>{book.title}</h2>
        <p>{book.author}</p>
        <div className={s.btns}>
          <button onClick={openModal}>
            <MdEdit />
          </button>
          <button onClick={()=>handleDelete(book.isbn)}>
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
