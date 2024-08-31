import { useState } from "react";
import s from "./CreateBookBtn.module.css";
import Modal from "../Modal/Modal";
import BookForm from "../BookForm/BookForm";
import Button from "../Button/Button";
const CreateBookBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Button className={s.create_btn} onClick={openModal}>
        Add book
      </Button>

      {isOpen && (
        <Modal onClose={closeModal} title="Add new book">
          <BookForm type="add" onClose={closeModal} />
        </Modal>
      )}
    </>
  );
};
export default CreateBookBtn;
