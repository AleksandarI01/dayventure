const Button = ({ type, onClickFunction, children }) => {
  return (
    <button
      className={
        "bg-venture-green rounded-full px-5 py-2 whitespace-nowrap text-venture-white hover:bg-venture-green-hovered"
      }
      type={type}
      onClick={onClickFunction}
    >
      {children}
    </button>
  );
};

export default Button;
