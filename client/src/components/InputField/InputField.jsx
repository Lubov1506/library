import s from "./InputField.module.css";
const InputField = ({
  register = () => {},
  name,
  placeholder,
  type = "text",
  errors,
  value,
}) => {
  return (
    <label className={s.imput_label}>
      <input
        value={value}
        type={type}
        name={name}
        placeholder={placeholder}
        {...register(name)}
      />
      <p className={s.error_msg}>{errors[name]?.message}</p>
    </label>
  );
};
export default InputField;
