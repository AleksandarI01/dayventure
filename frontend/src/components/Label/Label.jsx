const Label = ({ type, onClickFunction = null, children }) => {
  return (
    <>
      <div className={"bg-venture-darkgray h-5 rounded-full px-3 py-0.5 mx-1"} onClick={onClickFunction} id={children}>
        <p className={"text-xs text-venture-white"} id={children}>{children}</p>
      </div>
    </>
  );
};

export default Label;
