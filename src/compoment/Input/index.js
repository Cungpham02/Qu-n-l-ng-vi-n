function Input({
  children,
  type = "text",
  placeholder = "",
  className,
  name,
  id,
  onChange,
}) {
  return (
    <input
      id={id}
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className={className}
    >
      {children}
    </input>
  );
}

export default Input;
