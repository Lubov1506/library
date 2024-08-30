import { addBookThunk, updateBookThunk } from "../../redux/books/operations";

export const getBookFormOptions = (type, book = {}) => {
  const options = {
    add: {
      onSubmitThunk: addBookThunk,
      defaultValues: { title: "", isbn: "", author: "" },
    },
    update: {
      onSubmitThunk: updateBookThunk,
      defaultValues: {
        title: book.title || "",
        isbn: book.isbn || "",
        author: book.author || "",
      },
    },
  };
  return options[type];
};
