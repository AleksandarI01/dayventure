const Button = ({ type, onClickFunction, children }) => {
  return (
    <button
      className={
        "bg-venture-green rounded-full px-7 py-2 font-medium text-venture-white hover:bg-venture-green-hovered"
      }
      type={type}
      onClick={onClickFunction}
    >
      CONTINUE{/* {children} */}
    </button>
  );
};

export default Button;
