import { useDispatch, useSelector } from "react-redux";
import CreateBookBtn from "../../components/CreateBookBtn/CreateBookBtn";
import ListBooks from "../../components/ListBooks/ListBooks";
import s from "./HomePage.module.css";
import { useEffect } from "react";
import { fetchBooksThunk } from "../../redux/books/operations";
import SearchBar from "../../components/SearchBar/SearchBar";
import { selectBooks } from "../../redux/books/slice";

const HomePage = () => {
  const books = useSelector(selectBooks);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBooksThunk());
  }, [dispatch]);
  return (
    <div className={s.home_page}>
      <h1>Library</h1>
      {!!books.length && <SearchBar />}
      <ListBooks />
      <CreateBookBtn />
    </div>
  );
};
export default HomePage;
