const Button = ({ type, onClickFunction, children, color = "venture-green" }) => {
  let buttonClass = "";

  switch (color) {
    case "venture-red":
      buttonClass = "bg-venture-red hover:bg-venture-red-hovered text-venture-white";
      break;
    case "venture-green":
    default:
      buttonClass = "bg-venture-green hover:bg-venture-green-hovered text-venture-white";
      break;
  }

  return (
    <button
      className={`${buttonClass} rounded-full px-5 py-2 whitespace-nowrap`}
      type={type}
      onClick={onClickFunction}
    >
      {children}
    </button>
  );
};

export default Button;

