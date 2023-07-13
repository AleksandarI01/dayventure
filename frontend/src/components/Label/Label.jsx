const Label = ({ type, onClickFunction, children }) => {
  return (
    <>
      <div className={"bg-venture-darkgray h-5 rounded-full px-3 py-0.5 mx-1"}>
        <p className={"text-xs text-venture-white"}>{children}</p>
      </div>
    </>
  );
};

export default Label;
