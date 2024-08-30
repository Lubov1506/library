import { useDispatch } from "react-redux";
import CreateBookBtn from "../../components/CreateBookBtn/CreateBookBtn";
import ListBooks from "../../components/ListBooks/ListBooks";
import s from './HomePage.module.css'
import { useEffect } from "react";
import { fetchBooksThunk } from "../../redux/books/operations";
const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBooksThunk());
  }, [dispatch]);
  return (
    <div className={s.home_page}>
      <h1>Library</h1>
      <CreateBookBtn/>
      <ListBooks />
    </div>
  );
};
export default HomePage;
