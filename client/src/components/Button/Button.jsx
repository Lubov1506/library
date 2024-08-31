import s from "./Button.module.css";
import clsx from 'clsx'
const Button = ({  type = "submit", children, onClick = () => {}, className }) => {
  return (
    <button className={clsx(s.btn, className)} type={type} onClick={onClick}>
      {children}
    </button>
  );
};
export default Button;
