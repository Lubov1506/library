import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookFormScheme } from "../../schemes/bookFormScheme.js";
import { getBookFormOptions } from "./getBookFormOptions.js";
import s from "./BookForm.module.css";
import InputField from "../InputField/InputField.jsx";
import Button from "../Button/Button.jsx";
const BookForm = ({ type, book = {}, onClose }) => {
  const options = getBookFormOptions(type, book);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: options.defaultValues,
    resolver: yupResolver(bookFormScheme),
    mode: "onChange",
  });
  const onSubmit = (data) => {
    dispatch(options.onSubmitThunk(data));

    reset();
    onClose();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={s.book_form}
      autoComplete="nope"
    >
      <InputField
        type="text"
        name="title"
        placeholder="Type title"
        register={register}
        errors={errors}
      />
      <InputField
        type="text"
        name="author"
        placeholder="Type author"
        register={register}
        errors={errors}
      />
      <InputField
        type="text"
        name="isbn"
        placeholder="Type isbn"
        register={register}
        errors={errors}
      />

      <Button>{type === "add" ? "Add book" : "Update"}</Button>
    </form>
  );
};
export default BookForm;
