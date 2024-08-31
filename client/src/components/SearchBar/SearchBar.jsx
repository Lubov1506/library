import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import s from './SearchBar.module.css'
import { searchBookThunk } from "../../redux/books/operations";
import { yupResolver } from "@hookform/resolvers/yup";
import { searchFormScheme } from "../../schemes/bookFormScheme";
import { selectBooks, selectSearchBooks, showAllBooks } from "../../redux/books/slice";
const SearchBar = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const searchBooks = useSelector(selectSearchBooks);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {query: ''},
    resolver: yupResolver(searchFormScheme),
    mode: "onChange",
  });
  const onSubmit = (data) => {
    dispatch(searchBookThunk(data));
    reset();
  };

  const handleShowBook = () => {
    dispatch(showAllBooks());
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.search_bar}>
      <InputField placeholder='search ...' name="query" register={register} errors={errors} />
      <Button>Search</Button>
      {searchBooks.length < books.length && (
        <Button onClick={handleShowBook}>Show All</Button>
      )}
    </form>
  );
};
export default SearchBar;
